#nullable disable
using Microsoft.EntityFrameworkCore;
using GamesApi.Models;

namespace GamesApi.Contexts;
public class GameContext : DbContext
{
    public GameContext(DbContextOptions<GameContext> options):base(options){}
    public DbSet<Game> Games {get; set;}

    //public CharacterContext(DbContextOptions<CharacterContext> options):base(options){}
    public DbSet<Character> Characters {get; set;}

}
