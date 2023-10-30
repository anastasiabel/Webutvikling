using System.ComponentModel.DataAnnotations;
using GamesApi.Interfaces;

namespace GamesApi.Models;

public class Character : ICharacter
{
    [Key]
    public int Id {get; set;}
    public string Name {get; set;} = "";
    public int Game {get; set;}
    public string Image {get; set;} = null!;

}