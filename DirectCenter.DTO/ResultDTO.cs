using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Runtime.Serialization;


namespace DirectCenter.DTO
{

    [DataContract]
    public class ResultDTO
    {   
        [DataMember]
        public bool Result;

        [DataMember]
        public string Message;

        [DataMember]
        public object Data;
    }
}
