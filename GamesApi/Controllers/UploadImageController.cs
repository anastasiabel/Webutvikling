using Microsoft.AspNetCore.Mvc;

namespace GamesApi.Controllers;

[ApiController]
[Route("[controller]")]
public class UploadImageController : ControllerBase
{
    private readonly IWebHostEnvironment hosting;

    public UploadImageController(IWebHostEnvironment _hosting)
    {
        hosting = _hosting;
    }

    [HttpGet]
    public string Get()
    {
        return "Hei fra UploadImageController";
    }
    [HttpPost]
    public IActionResult SaveImage(IFormFile file)
    {
        string wwwrootPath = hosting.WebRootPath;
        string absolutePath = Path.Combine($"{wwwrootPath}/images/{file.FileName}");

        using(var fileStream = new FileStream(absolutePath, FileMode.Create))
        {
            file.CopyTo(fileStream);
        }

        return Ok();
    }
}