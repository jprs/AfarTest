using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

using DirectCenter.IBLL;


namespace DirectCenter.DTO
{
    public sealed class AllManagerFactory
    {
        public IUserManager UserManager { get; set; }
        public ICompanyManager CompanyManager { get; set; }
        public IDepartmentManager DepartmentManager { get; set; }
        
    }
}
