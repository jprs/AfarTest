using System.Collections;
using DirectCenter.Model;

namespace DirectCenter.IDAL
{
    public interface ICompanyDao
    {
        Company FindById(string  companyId);
        void Delete(Company  company);
        Company Save(Company company);
        Company SaveOrUpdate(Company  company);

    }
}
