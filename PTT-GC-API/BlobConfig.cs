using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PTT_GC_API
{
    public class BlobConfig
    {
        public string StorageConnection { get; set; }
        public string PrefixContainer { get; set; }
    }

    public class SapInterface
    {
        public string ActualPOCPercentUpdate { get; set; }
        public string ActualPOCPercentUpdate_ApiKey { get; set; }

        public string ProjectManagerUpdate { get; set; }
        public string ProjectManagerUpdate_ApiKey { get; set; }

        public string ProgressOfCompletion { get; set; }
        public string ProgressOfCompletion_ApiKey { get; set; }

    }

    public class UrlPowerAutomate
    {
        public string MSFLOW { get; set; }
        public string MAILINFORM { get; set; }

        public string CreatePDD { get; set; }
        public string EmailProjectLookback { get; set; }

    }

    public class UrlEMOC
    {
        public string Url { get; set; }
        public string ApiKey { get; set; }
    }
    public class UrlCreatePDD
    {
        public string SiteNames { get; set; }
        public string ClientIds { get; set; }
        public string ClientSecrets { get; set; }
        public string Tenant_IDS { get; set; }
        public string Prefixs { get; set; }
    }
}
