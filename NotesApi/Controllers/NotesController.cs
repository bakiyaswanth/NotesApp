using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using NotesApi.Models;
using NotesApi.Services;

namespace NotesApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppController : ControllerBase
    {
        private readonly MongoService _db;

        public AppController(MongoService db) => _db = db;

        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok(new { message = "API is working!", timestamp = DateTime.UtcNow });
        }

        [HttpGet("check-user/{username}")]
        public async Task<IActionResult> CheckUser(string username)
        {
            var user = await _db.Users.Find(u => u.Username == username).FirstOrDefaultAsync();
            return Ok(new { exists = user != null });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDto req)
        {
            Console.WriteLine($"[BACKEND] Registering user: {req.Username}");
            var hash = BCrypt.Net.BCrypt.HashPassword(req.Password);
            var newUser = new User { Username = req.Username, PasswordHash = hash };
            await _db.Users.InsertOneAsync(newUser);
            return Ok(new { message = "User created", userId = newUser.Id });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserDto req)
        {
            var user = await _db.Users.Find(u => u.Username == req.Username).FirstOrDefaultAsync();
            if (user == null || !BCrypt.Net.BCrypt.Verify(req.Password, user.PasswordHash))
                return Unauthorized(new { error = "Invalid credentials" });

            // Return UserID (In real app, return JWT Token here)
            return Ok(new { UserId = user.Id });
        }

        [HttpPost("notes")]
        public async Task<IActionResult> CreateNote(Note note)
        {
            await _db.Notes.InsertOneAsync(note);
            return Ok(note);
        }

        [HttpGet("notes/{userId}")]
        public async Task<IActionResult> GetNotes(string userId)
        {
            var notes = await _db.Notes.Find(n => n.UserId == userId)
                .SortByDescending(n => n.CreatedAt)
                .ToListAsync();
            return Ok(notes);
        }

        [HttpPut("notes/{id}")]
        public async Task<IActionResult> UpdateNote(string id, Note note)
        {
            var filter = Builders<Note>.Filter.Eq(n => n.Id, id);
            var update = Builders<Note>.Update
                .Set(n => n.Title, note.Title)
                .Set(n => n.Content, note.Content);
            
            await _db.Notes.UpdateOneAsync(filter, update);
            var updatedNote = await _db.Notes.Find(n => n.Id == id).FirstOrDefaultAsync();
            return Ok(updatedNote);
        }

        [HttpDelete("notes/{id}")]
        public async Task<IActionResult> DeleteNote(string id)
        {
            await _db.Notes.DeleteOneAsync(n => n.Id == id);
            return Ok(new { message = "Note deleted" });
        }
    }

    public record UserDto(string Username, string Password);
}