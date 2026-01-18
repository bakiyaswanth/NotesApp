using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using NotesApi.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// ----------------------
// Logging
// ----------------------
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// ----------------------
// Services
// ----------------------
builder.Services.AddControllers();
builder.Services.AddSingleton<MongoService>();

// ----------------------
// CORS - PERMISSIVE FOR SHARED HOSTING
// ----------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// ----------------------
// Swagger / OpenAPI
// ----------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ═══════════════════════════════════════════════════════════════════════
// CRITICAL #1: HANDLE OPTIONS PREFLIGHT FIRST (BEFORE ANY OTHER MIDDLEWARE)
// This catches 405 errors from IIS/shared hosting
// ═══════════════════════════════════════════════════════════════════════
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.StatusCode = 204; // No Content (standard for preflight)

        context.Response.Headers.Append("Access-Control-Allow-Origin", "*");
        context.Response.Headers.Append("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        context.Response.Headers.Append("Access-Control-Allow-Headers", "*");
        context.Response.Headers.Append("Access-Control-Max-Age", "86400"); // 24hr cache

        await context.Response.CompleteAsync();
        return;
    }
    await next();
});

// ═══════════════════════════════════════════════════════════════════════
// CRITICAL #2: CORS POLICY (for non-preflight requests)
// ═══════════════════════════════════════════════════════════════════════
app.UseCors("AllowAll");

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Notes API v1");
        c.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();
app.MapControllers();

// ----------------------
// Health check endpoint
// ----------------------
app.MapGet("/", () => new
{
    status = "online ✅",
    message = "Notes API running - CORS + OPTIONS PREFLIGHT FIXED",
    endpoints = new[] { "/api/app/register", "/api/app/login", "/api/app/notes", "/swagger" },
    corsStatus = "✅ Preflight handler active"
});

// ----------------------
// Dynamic port for hosting platforms
// ----------------------
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port) && int.TryParse(port, out var portNumber))
{
    app.Urls.Add($"http://0.0.0.0:{portNumber}");
}

app.Run();
