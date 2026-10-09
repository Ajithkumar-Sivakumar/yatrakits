/* Public website settings. Everything in this file is visible to visitors. */
window.YATRA_KITS_CONFIG = {
  developmentMode: true,
  business: {
    name: "Yatra Kits",
    tagline: "Everything You Need for a Peaceful Yatra.",
    introduction: "[Add your company introduction here.]",
    story: "[Add why the business was started here.]",
    mission: "[Add your mission here.]",
    values: "[Add the values that guide your work here.]",
    team: "[Add a founder or team introduction here.]",
    whatsappNumber: "", // International format, digits only; e.g. 919876543210
    email: "",
    phone: "",
    serviceLocation: "[Add your service area]",
    socialLinks: {
      instagram: "",
      facebook: ""
    }
  },
  contentsNote: "Kit contents may vary by package. Please confirm the included items before enquiring.",
  products: [
    {
      id: "essential",
      name: "Essential Yatra Kit",
      image: "assets/images/products/essential-kit.jpg",
      imageAlt: "Sample concept image for the Essential Yatra Kit",
      description: "A sample concept for bringing everyday travel essentials together in one easy-to-carry kit.",
      intendedUse: "For individual travellers looking for a simple, organized starting point.",
      contents: ["Travel essentials (confirm items)", "Personal convenience items (confirm items)", "Packing and organization items (confirm items)"],
      price: "",
      availability: "Sample concept · confirm availability"
    },
    {
      id: "family",
      name: "Family Yatra Kit",
      image: "assets/images/products/family-kit.jpg",
      imageAlt: "Sample concept image for the Family Yatra Kit",
      description: "A sample concept for families who would like shared essentials organized for a journey.",
      intendedUse: "For family travellers planning what to pack together and what to keep personal.",
      contents: ["Family travel considerations (confirm items)", "Shared organization items (confirm items)", "Optional personal items (confirm items)"],
      price: "",
      availability: "Sample concept · confirm availability"
    },
    {
      id: "custom",
      name: "Custom Yatra Kit",
      image: "assets/images/products/custom-kit.jpg",
      imageAlt: "Sample concept image for the Custom Yatra Kit",
      description: "A sample concept for discussing a kit shaped around your own preferences and requirements.",
      intendedUse: "For travellers who would like to ask about a personalized arrangement.",
      contents: ["Optional customizable items (discuss with us)", "Preferred organization (discuss with us)", "Final contents confirmed before purchase"],
      price: "",
      availability: "Made to discuss · confirm availability"
    }
  ],
  contentsCategories: [
    { title: "Travel essentials", text: "Consider the practical items you tend to reach for while travelling." },
    { title: "Personal convenience", text: "Think about small comforts and personal-use items for your route." },
    { title: "Organization & packing", text: "Decide how you prefer to group, carry and find your belongings." },
    { title: "Family considerations", text: "Plan shared items alongside the individual needs of each traveller." },
    { title: "Optional customization", text: "Ask whether a specific preference or item can be included." }
  ],
  galleryImages: [
    { src: "assets/images/gallery/product-detail-1.jpg", alt: "Close-up photograph of Yatra Kit contents, to be added by the owner", caption: "Kit details · add your photograph" },
    { src: "assets/images/gallery/product-detail-2.jpg", alt: "Yatra Kit arranged for a journey, to be added by the owner", caption: "Ready to go · add your photograph" },
    { src: "assets/images/gallery/product-detail-3.jpg", alt: "Yatra Kit packed for travel, to be added by the owner", caption: "Packed with care · add your photograph" }
  ],
  faqs: [
    { question: "What is included in a Yatra Kit?", answer: "The exact contents depend on the selected kit. Please ask us to confirm the current item list before enquiring or purchasing." },
    { question: "Can I customize a kit?", answer: "Customization is a sample offering to discuss. Contact us with your requirements and we will confirm what is possible." },
    { question: "How do I check the price?", answer: "Prices have not been configured on this website. Contact us for current pricing and confirm what is included." },
    { question: "Do you offer bulk or family kits?", answer: "A Family Yatra Kit is shown as a sample concept. Please contact us to confirm current options and any bulk requirements." },
    { question: "Which locations do you serve?", answer: "[Add your service area and any location details here.]" },
    { question: "How can I place an enquiry?", answer: "Use the WhatsApp or email links on this page once the business contact details are configured. You can also use the phone number if one is provided." }
  ]
};
