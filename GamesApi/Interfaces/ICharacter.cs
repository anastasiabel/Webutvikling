namespace GamesApi.Interfaces;

public interface ICharacter
{
    int Id {get; set;}
    string Name {get; set;}
    int Game {get; set;}
    string Image {get; set;}

}