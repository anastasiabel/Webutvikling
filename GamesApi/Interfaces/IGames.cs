namespace GamesApi.Interfaces;

public interface IGames
{
    int Id {get; set;}
    string Title {get; set;}
    string Platform {get; set;}
    int ReleaseYear{get; set;}
    string? Description {get; set;}
    string Image {get; set;}

}