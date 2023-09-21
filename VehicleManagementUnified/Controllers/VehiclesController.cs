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
    public class VehiclesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public VehiclesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Vehicles
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Vehicle>>> GetVehicles()
        {
            return await _context.Vehicles.ToListAsync();
        }

        // GET: api/Vehicles/id
        [HttpGet("{id}")]
        public async Task<ActionResult<Vehicle>> GetVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);

            if (vehicle == null)
            {
                return NotFound();
            }

            return vehicle;
        }

        // POST: api/Vehicles
        [HttpPost]
        public async Task<ActionResult<Vehicle>> CreateVehicle(Vehicle vehicle)
        {
            Location loc = await _context.Locations.FindAsync(vehicle.LocationId); ;
            Driver driver = await _context.Drivers.FindAsync(vehicle.DriverId);

            vehicle.Location = loc;
            vehicle.Driver = driver;

            _context.Vehicles.Add(vehicle);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVehicle), new { id = vehicle.Id }, vehicle);
        }

        // PUT: api/Vehicles/id
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVehicle(int id, Vehicle vehicle)
        {
            if (id != vehicle.Id)
            {
                return BadRequest();
            }

            _context.Entry(vehicle).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VehicleExists(id))
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

        // DELETE: api/Vehicles/id
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVehicle(int id)
        {
            var vehicle = await _context.Vehicles.FindAsync(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            _context.Vehicles.Remove(vehicle);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool VehicleExists(int id)
        {
            return _context.Vehicles.Any(e => e.Id == id);
        }

        // GET: api/Vehicles/Download
        [HttpGet("Download")]
        public async Task<IActionResult> DownloadVehicles()
        {
            // Get all vehicles
            var vehicles = await _context.Vehicles.ToListAsync();

            // Convert the vehicles to a string
            var sb = new StringBuilder();
            foreach (var vehicle in vehicles)
            {
                sb.AppendLine($"Id: {vehicle.Id}, Model: {vehicle.Model}, Registration number: {vehicle.RegistrationNumber}, Driver: {vehicle.Driver.Name}");  // Add all necessary properties
            }

            // Convert the string builder to a byte array
            var byteArray = Encoding.UTF8.GetBytes(sb.ToString());

            // Return the file
            return File(byteArray, "text/plain", "Vehicles.txt");
        }

    }
}
