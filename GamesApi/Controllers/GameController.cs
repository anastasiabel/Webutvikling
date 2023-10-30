using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamesApi.Contexts;
using GamesApi.Models;

namespace GamesApi.Controllers;

[ApiController]
[Route("[controller]")]
public class GameController : ControllerBase
{
    private readonly GameContext context;

    public GameController(GameContext _context)
    {
        context = _context; 
    }

    [HttpGet]
    public async Task<ActionResult<List<Game>>> Get()
    {
        try
        {
            List<Game> games = await context.Games.ToListAsync();
            return Ok(games);        
        }
        catch
        {
            return StatusCode(500); // 500 er en generisk status for at noe galt skjedde på serverside; eksempelvis her at Web Api ikke kunne nå databasen.
        }
    }

    public class GameQuery
    {
        public string? Title { get; set; }

        public string? Platform { get; set; }

        public int? ReleaseYearFrom { get; set; }
    }

    // SEE https://www.learnentityframeworkcore.com/dbset/querying-data
    [HttpGet]    
    [Route("[action]/{title}")] // https://localhost:7XXX/cartoon/getByTitle/tegnefilmnTittelHer
    public async Task<ActionResult<List<Game>>> GetByTitle(string title)
    // SEE https://stackoverflow.com/questions/46225584/accessing-query-parameters-in-net-controller
    //public async Task<ActionResult<List<Game>>> GetByTitle(GameQuery gameQuery)
    {
        /*var games = await context.Games
            .Where(g =>
                (gameQuery.Title == null || g.Title.ToLower().Contains(gameQuery.Title.ToLower())) &&
                (gameQuery.ReleaseYearFrom == null || g.ReleaseYear >= gameQuery.ReleaseYearFrom) &&
                (gameQuery.Platform == null || g.Platform == gameQuery.Platform)
            )
            .OrderBy(g => g.ReleaseYear).Reverse()
            .ToListAsync();
        */

        try
        {  
            var games = await context.Games
                       .Where(g => g.Title.ToLower().Contains(title.ToLower())) // game name contains title
                       .OrderBy(g => g.ReleaseYear).Reverse() // newest games first
                       .ToListAsync();
            return Ok(games);
        }
        catch
        {
            return StatusCode(500); // 500 er en generisk status for at noe galt skjedde på serverside; eksempelvis her at Web Api ikke kunne nå databasen.
        }
    }

    [HttpGet]
    [Route("[action]/{platform}")]
    public async Task<ActionResult<List<Game>>> GetByPlatform(string platform)
    {
        try
        {  
            var games = await context.Games
                       .Where(g => g.Platform == platform)
                       .ToListAsync();
            return Ok(games);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Game>> Get(int id)
    {
        Game? game = await context.Games.FindAsync(id);

        if( game != null )
        {
            return Ok(game);
        }
        else
        {
            return NotFound();
        }
    }

    [HttpPost]
    public IActionResult Post(Game newGame)
    {
        try
        {
            context.Games.Add(newGame);
            context.SaveChanges();
            return CreatedAtAction("Get", new {id = newGame.Id}, newGame ); 
        }
        catch
        {
            return StatusCode(500); 
        }    
    }

    [HttpPut]
    public IActionResult Put(Game editedGame)
    {
        context.Entry(editedGame).State = EntityState.Modified;
        context.SaveChanges();
        return  CreatedAtAction("Get", new {id = editedGame.Id}, editedGame ); 
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        Game? gameToDelete = context.Games.Find(id);

        if(gameToDelete != null)
        {
            context.Games.Remove(gameToDelete);
            context.SaveChanges();
            return NoContent();
        }
        else
        {
            return NotFound();
        }
    }
}

