using Newtonsoft.Json;
using System.Collections.Generic;

namespace PTT_GC_API.Models.IF
{

    public class UpdatePOC
    {
        [JsonProperty(PropertyName = "Envelopes")]
        public Envelopes Envelopes { get; set; }
    }

    public class Envelopes
    {
        [JsonProperty(PropertyName = "Envelope")]
        public List<Envelope> Envelope { get; set; }
    }

    public class UpdatePOCRequest
    {
        [JsonProperty(PropertyName = "soapenv:Envelope")]
        public EnvelopeRequest Envelope { get; set; }
    }

    public class EnvelopeRequest
    {
        [JsonProperty(PropertyName = "@xmlns:soapenv")]
        public string LINK { get; set; }
        [JsonProperty(PropertyName = "@xmlns:urn")]
        public string URN { get; set; }
        [JsonProperty(PropertyName = "soapenv:Header")]
        public string Header { get; set; }
        [JsonProperty(PropertyName = "soapenv:Body")]
        public Body Body { get; set; }
    }

    public class Envelope
    {
        [JsonProperty(PropertyName = "@xmlns:SOAP")]
        public string LINK { get; set; }
        [JsonProperty(PropertyName = "@xmlns:urn")]
        public string URN { get; set; }
        [JsonProperty(PropertyName = "SOAP:Header")]
        public string Header { get; set; }
        [JsonProperty(PropertyName = "SOAP:Body")]
        public Body Body { get; set; }
    }

    public class Body
    {
        [JsonProperty(PropertyName = "@xmlns:urn")]
        public string URN { get; set; }
        [JsonProperty(PropertyName = "urn:ZPS_E022B")]
        public ZPS_E022B ZPS_E022B { get; set; }
        [JsonProperty(PropertyName = "ns0:ZPS_E022B.Response")]
        public ZPS_E022B_Response ZPS_E022B_Response { get; set; }
    }

    public class ZPS_E022B
    {
        [JsonProperty(PropertyName = "P_ASDATE")]
        public string P_ASDATE { get; set; }
        [JsonProperty(PropertyName = "P_PA")]
        public string P_PA { get; set; }
        [JsonProperty(PropertyName = "P_PERI01")]
        public double? P_PERI01 { get; set; }
        [JsonProperty(PropertyName = "P_PERI02")]
        public double? P_PERI02 { get; set; }
        [JsonProperty(PropertyName = "P_PERI03")]
        public double? P_PERI03 { get; set; }
        [JsonProperty(PropertyName = "P_PERI04")]
        public double? P_PERI04 { get; set; }
        [JsonProperty(PropertyName = "P_PERI05")]
        public double? P_PERI05 { get; set; }
        [JsonProperty(PropertyName = "P_PERI06")]
        public double? P_PERI06 { get; set; }
        [JsonProperty(PropertyName = "P_PERI07")]
        public double? P_PERI07 { get; set; }
        [JsonProperty(PropertyName = "P_PERI08")]
        public double? P_PERI08 { get; set; }
        [JsonProperty(PropertyName = "P_PERI09")]
        public double? P_PERI09 { get; set; }
        [JsonProperty(PropertyName = "P_PERI10")]
        public double? P_PERI10 { get; set; }
        [JsonProperty(PropertyName = "P_PERI11")]
        public double? P_PERI11 { get; set; }
        [JsonProperty(PropertyName = "P_PERI12")]
        public double? P_PERI12 { get; set; }
        [JsonProperty(PropertyName = "P_WPSPID")]
        public string P_WPSPID { get; set; }
        [JsonProperty(PropertyName = "P_YEAR")]
        public string P_YEAR { get; set; }
    }

    public class ZPS_E022B_Response
    {
        [JsonProperty(PropertyName = "@xmlns:ns0")]
        public string NS0 { get; set; }
        [JsonProperty(PropertyName = "EV_RETURN")]
        public EV_RETURN EV_RETURN { get; set; }
    }

    public class EV_RETURN
    {
        [JsonProperty(PropertyName = "item")]
        public List<string> item { get; set; }
    }
}
