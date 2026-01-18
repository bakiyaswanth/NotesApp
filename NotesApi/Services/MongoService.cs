using MongoDB.Driver;
using NotesApi.Models;

namespace NotesApi.Services
{
    public class MongoService
    {
        private readonly IMongoDatabase _database;

        public MongoService(IConfiguration config)
        {
            try
            {
                // Connects to the string defined in appsettings.json
                var connectionString = config.GetConnectionString("MongoDb");
                
                if (string.IsNullOrEmpty(connectionString))
                {
                    throw new InvalidOperationException("MongoDB connection string is missing. Please check appsettings.json or environment variables.");
                }

                var client = new MongoClient(connectionString);
                _database = client.GetDatabase("NotesDb");
                
                // Connection will be tested on first database operation
                // Removed blocking ping to allow app to start even if MongoDB is temporarily unavailable
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException($"Failed to initialize MongoDB connection: {ex.Message}", ex);
            }
        }

        public IMongoCollection<Note> Notes => _database.GetCollection<Note>("Notes");
        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    }
}
