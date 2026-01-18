using NotesApi.Services;

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
builder.Services.AddSingleton<MongoService>(); // MongoDB service

// ----------------------
// CORS
// ----------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
                "https://ui-notesapp.netlify.app", // Production frontend
                "http://localhost:4200"            // Local Angular dev server
            )
            .AllowAnyHeader()
            .AllowAnyMethod();
        // .AllowCredentials(); // Uncomment if using cookies/JWT
    });
});

// ----------------------
// Swagger / OpenAPI
// ----------------------
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ----------------------
// Middleware
// ----------------------
app.UseCors("AllowFrontend");   // Must be FIRST
app.UseHttpsRedirection();      // Redirect HTTP → HTTPS
// app.UseAuthorization();      // Only if you use [Authorize]

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Notes API v1");
        c.RoutePrefix = "swagger";
    });
}

// ----------------------
// Routes
// ----------------------
app.MapControllers();

// Health check endpoint
app.MapGet("/", () => new
{
    status = "online",
    message = "Notes API is running",
    endpoints = new
    {
        register = "/api/app/register",
        login = "/api/app/login",
        notes = "/api/app/notes",
        swagger = "/swagger"
    }
});

// ----------------------
// Optional: Dynamic port for hosting (Docker, Render, Railway)
// ----------------------
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    app.Urls.Add($"http://0.0.0.0:{port}");
}

// ----------------------
// Run
// ----------------------
app.Run();
