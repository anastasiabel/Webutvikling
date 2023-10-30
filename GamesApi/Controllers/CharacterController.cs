using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GamesApi.Contexts;
using GamesApi.Models;

namespace GamesApi.Controllers;

[ApiController]
[Route("[controller]")]
public class CharacterController : ControllerBase
{
    private readonly GameContext context;

    public CharacterController(GameContext _context)
    {
        context = _context; 
    }

    [HttpGet]
    public async Task<ActionResult<List<Character>>> Get()
    {
        try
        {
            List<Character> characters = await context.Characters.ToListAsync();
            return Ok(characters);        
        }
        catch
        {
            return StatusCode(500); // 500 er en generisk status for at noe galt skjedde på serverside; eksempelvis her at Web Api ikke kunne nå databasen.
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Game>> Get(int id)
    {
        Character? character = await context.Characters.FindAsync(id);

        if( character != null )
        {
            return Ok(character); // Status 200 + Cartoon-objektet
        }
        else
        {
            return NotFound(); // Status 404 Ikke Funnet
        }
    }

    [HttpPost]
    public IActionResult Post(Character newCharacter)
    {
        try
        {
            context.Characters.Add(newCharacter);
            context.SaveChanges();
            return CreatedAtAction("Get", new {id = newCharacter.Id}, newCharacter ); 
        }
        catch
        {
            return StatusCode(500); 
        }    
    }


    [HttpGet]    
    [Route("[action]/{gameId}")]
    public async Task<ActionResult<List<Character>>> GetByGameId(int gameId)
    {
        try
        {  
            var characters = await context.Characters
                       .Where(c => c.Game == gameId)
                       .ToListAsync();
            return Ok(characters);
        }
        catch
        {
            return StatusCode(500); // 500 er en generisk status for at noe galt skjedde på serverside; eksempelvis her at Web Api ikke kunne nå databasen.
        }
    }

    [HttpPut]
    public IActionResult Put(Character editedCharacter)
    {
        context.Entry(editedCharacter).State = EntityState.Modified;
        context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        Character? characterToDelete = context.Characters.Find(id);

        if(characterToDelete != null)
        {
            context.Characters.Remove(characterToDelete);
            context.SaveChanges();
            return NoContent();
        }
        else
        {
            return NotFound();
        }
    }
}