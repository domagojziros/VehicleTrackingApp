namespace VehicleManagementUnified.Models
{
    public class Location
    {
        public int Id { get; set; } 
        public string Name { get; set; }   
        public string Address { get; set; }

        public double LocationX { get; set; }
        public double LocationY { get; set; }
        public DateTime Time { get; set; }

      
    }
}
