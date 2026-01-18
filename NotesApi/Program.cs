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
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader()
              .WithExposedHeaders("*"); // Expose all headers
    });
});

// Add Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// CORS MUST be FIRST - before any other middleware
app.UseCors("AllowAll");

// Configure Swagger - Enable in all environments for API documentation
app.UseSwagger();
app.UseSwaggerUI(c => 
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Notes API v1");
    c.RoutePrefix = "swagger";
});

// HTTPS redirection (after CORS)
app.UseHttpsRedirection();

// Map controllers
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