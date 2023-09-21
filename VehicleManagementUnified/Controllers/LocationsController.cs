using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using VehicleManagementUnified.Data;
using VehicleManagementUnified.Models;

namespace VehicleManagementUnified.Controllers
{
    //[Authorize(Roles = $"{SharedData.ADMINISTRATOR_ROLE},{SharedData.VERIFIED_USER_ROLE}")]
    [Authorize(Policy = "AuthorizedUser")]
    [Route("api/[controller]")]
    [ValidateAntiForgeryToken]
    [ApiController]
    public class LocationsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public LocationsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Location
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Location>>> GetLocations()
        {
            return await _context.Locations.ToListAsync();
        }

        // GET: api/Location/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Location>> GetLocation(int id)
        {
            var location = await _context.Locations.FindAsync(id);

            if (location == null)
            {
                return NotFound();
            }

            return location;
        }

        // POST: api/Location
        [HttpPost]
        public async Task<ActionResult<Location>> PostLocation(Location location)
        {
            _context.Locations.Add(location);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLocation", new { id = location.Id }, location);
        }

        // PUT: api/Location/id
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLocation(int id, Location location)
        {
            if (id != location.Id)
            {
                return BadRequest();
            }

            _context.Entry(location).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LocationExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Location/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var location = await _context.Locations.FindAsync(id);
            if (location == null)
            {
                return NotFound();
            }

            _context.Locations.Remove(location);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LocationExists(int id)
        {
            return _context.Locations.Any(e => e.Id == id);
        }

        // GET: api/Locations/Download
        [HttpGet("Download")]
        public async Task<IActionResult> DownloadLocations()
        {
            // Get all locations
            var locations = await _context.Locations.ToListAsync();

            // Convert the locations to a string
            var sb = new StringBuilder();
            foreach (var location in locations)
            {
                sb.AppendLine($"Id: {location.Id}, Name: {location.Name}, Address: {location.Address}");  // Add all necessary properties
            }

            // Convert the string builder to a byte array
            var byteArray = Encoding.UTF8.GetBytes(sb.ToString());

            // Return the file
            return File(byteArray, "text/plain", "Locations.txt");
        }
    }
}
