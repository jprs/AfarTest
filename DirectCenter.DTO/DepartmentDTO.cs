using System.Runtime.Serialization;

namespace DirectCenter.DTO
{
    [DataContract]
    public class DepartmentDTO
    {
        [DataMember] public string DepartmentID;
        [DataMember] public string DepartmentName;
    }
}