using NotesApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add logging
builder.Logging.ClearProviders();
builder.Logging.AddConsole();
builder.Logging.AddDebug();

// Add Services
builder.Services.AddControllers();
builder.Services.AddSingleton<MongoService>(); // Register Mongo
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        b => b.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure Swagger - Enable in all environments for API documentation
app.UseSwagger();
app.UseSwaggerUI(c => 
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Notes API v1");
    c.RoutePrefix = "swagger";
});

// Enable HTTPS redirection in all environments
app.UseHttpsRedirection();

// CORS must be before MapControllers
app.UseCors("AllowAll");

// Handle preflight OPTIONS requests
app.Use(async (context, next) =>
{
    if (context.Request.Method == "OPTIONS")
    {
        context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
        context.Response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        context.Response.Headers.Add("Access-Control-Allow-Headers", "Content-Type, Authorization");
        context.Response.StatusCode = 200;
        await context.Response.WriteAsync(string.Empty);
        return;
    }
    await next();
});

app.MapControllers();

// Health check endpoint
app.MapGet("/", () => new { 
    status = "online", 
    message = "Notes API is running",
    endpoints = new {
        register = "/api/app/register",
        login = "/api/app/login",
        notes = "/api/app/notes",
        swagger = "/swagger"
    }
});

// Port configuration - only set if PORT env variable exists (for Docker/Render/Railway)
// For IIS/hosting providers, let them handle the port
var port = Environment.GetEnvironmentVariable("PORT");
if (!string.IsNullOrEmpty(port))
{
    app.Urls.Add($"http://0.0.0.0:{port}");
}

app.Run();