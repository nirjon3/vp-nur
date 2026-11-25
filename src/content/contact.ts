/**
 * Verified public contact details of Nurul Haque Nur (VP Nur).
 */
export interface ContactInfo {
  officeAddress: { bn: string; en: string } | null;
  phone: string | null;
  email: string | null;
  officeHours: { bn: string; en: string } | null;
  mapEmbedUrl: string | null;
  mapLink: string | null;
  socials: { id: string; label: string; url: string | null }[];
}

export const contactInfo: ContactInfo = {
  officeAddress: {
    bn: "প্রবাসী কল্যাণ ভবন (লেভেল ৭), ৭১–৭২ পুরাতন এলিফ্যান্ট রোড, ইস্কাটন গার্ডেন, রমনা, ঢাকা–১০০০",
    en: "Probashi Kallyan Bhaban (Level 7), 71–72 Old Elephant Road, Eskaton Garden, Ramna, Dhaka-1000",
  },
  phone: "+880 2-48317711",
  email: "minister@probashi.gov.bd",
  officeHours: {
    bn: "রবিবার থেকে বৃহস্পতিবার: সকাল ৯:০০ — বিকাল ৫:০০ (সরকারি ছুটির দিন ব্যতীত)",
    en: "Sunday to Thursday: 9:00 AM — 5:00 PM (Closed on public holidays)",
  },
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.197992791834!2d90.4005828!3d23.7403214!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b893cb691b15%3A0x6b876fc6d691168f!2sProbashi%20Kalyan%20Bhaban!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd",
  mapLink: "https://maps.google.com/?q=Probashi+Kalyan+Bhaban+Dhaka",
  socials: [
    {
      id: "facebook",
      label: "Official Facebook Page",
      url: "https://www.facebook.com/nurulhaquenur.official",
    },
    {
      id: "youtube",
      label: "Official YouTube Channel",
      url: "https://www.youtube.com/@NurulHaqueNurOfficial",
    },
    {
      id: "x",
      label: "X (Twitter)",
      url: "https://twitter.com/vp_nur",
    },
    {
      id: "wikimedia",
      label: "Wikimedia Commons Archive",
      url: "https://commons.wikimedia.org/wiki/Nurul_Haque_Nur",
    },
  ],
};
