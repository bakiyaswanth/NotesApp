using MongoDB.Driver;
using NotesApi.Models;

namespace NotesApi.Services
{
    public class MongoService
    {
        private readonly IMongoDatabase _database;

        public MongoService(IConfiguration config)
        {
            // Connects to the string defined in appsettings.json
            var connectionString = config.GetConnectionString("MongoDb");
            var client = new MongoClient(connectionString);
            _database = client.GetDatabase("NotesDb");
        }

        public IMongoCollection<Note> Notes => _database.GetCollection<Note>("Notes");
        public IMongoCollection<User> Users => _database.GetCollection<User>("Users");
    }
}
