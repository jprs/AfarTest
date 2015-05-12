using DirectCenter.Model;
namespace DirectCenter.DTO.Mappers
{
    public class DepartmentDTOMapper
    {
        public static DepartmentDTO MapToDTO(Department model)
        {
            DepartmentDTO  dto = new DepartmentDTO();
            dto.DepartmentID = model.DepartmentID;
            dto.DepartmentName = model.DepartmentName;
            return dto;
        }
    }
}
