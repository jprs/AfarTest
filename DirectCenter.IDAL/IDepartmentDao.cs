using System.Collections;
using DirectCenter.Model;
namespace DirectCenter.IDAL
{
    public interface IDepartmentDao
    {
        Department FindById(string  departmentId);
        void Delete(Department  department);
        Department Save(Department  department);
        Department SaveOrUpdate(Department department);
        IList FindAll();
    }
}
