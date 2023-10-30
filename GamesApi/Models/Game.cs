using System.ComponentModel.DataAnnotations;
using GamesApi.Interfaces;

namespace GamesApi.Models;

public class Game : IGames
{
    [Key]
    public int Id {get; set;}
    public string Title {get; set;} = "";
    public string Platform {get; set;} = null!;
    public int ReleaseYear{get; set;} 
    public string? Description{get; set;}
    public string Image {get; set;} = null!;


}