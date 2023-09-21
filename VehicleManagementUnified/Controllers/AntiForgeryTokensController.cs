using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace VehicleManagementUnified.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AntiForgeryTokensController : ControllerBase
    {

        IAntiforgery _antiforgery;

        public AntiForgeryTokensController(IAntiforgery _antiforgery)
        {
            this._antiforgery = _antiforgery;
        }

        [HttpGet("antiforgery")]
        public IActionResult GenerateAntiForgeryTokens()
        {
            var tokens = _antiforgery.GetAndStoreTokens(HttpContext);

            HttpContext.Response.Cookies.Append("XSRF-TOKEN", tokens.RequestToken!, 
                new CookieOptions { HttpOnly = false, SameSite = SameSiteMode.None, Secure = true, Path="/" });

            return Ok(new { token = tokens.RequestToken });
        }
    }
}
