const Doctor = require('../models/Doctor');

// Hospital knowledge base for the AI chatbot
const hospitalInfo = {
  name: 'CareSphere Hospital',
  departments: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'ICU', 'Maternity', 'ENT'],
  visitingHours: '10:00 AM - 12:00 PM and 4:00 PM - 7:00 PM',
  emergencyContact: '+91 98765 00000',
  address: 'CareSphere Medical Complex, Sector 21, Mumbai, Maharashtra 400001',
  ambulance: '108 (Toll-free)',
  pharmacy: 'Open 24/7 on Ground Floor',
  labTimings: '7:00 AM - 9:00 PM (Mon-Sat), 8:00 AM - 2:00 PM (Sun)',
  insurancePartners: ['Star Health', 'HDFC Ergo', 'ICICI Lombard', 'Max Bupa', 'Bajaj Allianz', 'New India Assurance'],
};

// Pattern-response rules
const rules = [
  {
    patterns: [/\b(hi|hello|hey|good morning|good afternoon|good evening|namaste)\b/i],
    response: () => `Hello! 👋 Welcome to **CareSphere Hospital**. I'm your AI health assistant.\n\nI can help you with:\n• 🏥 Department information\n• 👨‍⚕️ Doctor details & availability\n• 📅 Appointment booking guidance\n• 🛏️ Bed availability\n• ⏰ Visiting hours\n• 🚑 Emergency contacts\n\nHow can I assist you today?`,
  },
  {
    patterns: [/\b(department|departments|specialit|specialt|ward|wards)\b/i],
    response: () => `🏥 **Our Departments:**\n\n${hospitalInfo.departments.map((d, i) => `${i + 1}. **${d}**`).join('\n')}\n\nWould you like to know about doctors in any specific department?`,
  },
  {
    patterns: [/\b(visit|visiting)\s*(hour|time|timing)/i, /\bwhen\b.*\bvisit/i],
    response: () => `⏰ **Visiting Hours:**\n\n📌 Morning: **10:00 AM - 12:00 PM**\n📌 Evening: **4:00 PM - 7:00 PM**\n\n> Note: ICU visiting is restricted to 15 minutes per session, one visitor at a time.`,
  },
  {
    patterns: [/\b(emergency|urgent|accident|ambulance)\b/i],
    response: () => `🚑 **Emergency Services:**\n\n📞 Emergency Helpline: **${hospitalInfo.emergencyContact}**\n🚑 Ambulance: **${hospitalInfo.ambulance}**\n📍 Address: ${hospitalInfo.address}\n\n⚠️ Our Emergency Department operates **24/7** with trauma specialists on-call.`,
  },
  {
    patterns: [/\b(appointment|book|booking|schedule)\b/i],
    response: () => `📅 **Appointment Booking:**\n\nYou can book an appointment through our portal:\n1. Click the **"📋 Book Appointment"** button on the main page\n2. Select your **department**\n3. Choose a **doctor**\n4. Pick your preferred **date & time slot**\n5. Fill in your details and confirm!\n\n💡 Each doctor has multiple slots available from **9:00 AM to 4:00 PM**.`,
  },
  {
    patterns: [/\b(bed|beds|room|admission|admit)\b/i],
    response: () => `🛏️ **Bed & Room Information:**\n\n• **AC Private Room** — ₹4,500/day\n• **AC Semi-Private** — ₹3,000/day\n• **Non-AC General Ward** — ₹1,200/day\n• **ICU Bed** — ₹8,000/day\n• **Maternity Ward** — ₹5,000/day\n\nFor real-time availability, visit the **Patient Portal** → **Bed Availability** tab.`,
  },
  {
    patterns: [/\b(doctor|doctors|dr)\b/i],
    response: async () => {
      try {
        const doctors = await Doctor.find({ isAvailable: true }).select('name department specialization experience consultationFee');
        if (doctors.length > 0) {
          const list = doctors.map((d) => `• **${d.name}** — ${d.department} (${d.specialization}) — ₹${d.consultationFee}`).join('\n');
          return `👨‍⚕️ **Available Doctors:**\n\n${list}\n\nWould you like to book an appointment with any of these doctors?`;
        }
      } catch (e) { /* fallback below */ }
      return `👨‍⚕️ **Our Doctors:**\n\n• Dr. Priya Menon — Cardiology\n• Dr. Anil Kumar — Neurology\n• Dr. Sneha Reddy — Pediatrics\n• Dr. Rajesh Iyer — Orthopedics\n• Dr. Fatima Sheikh — General Medicine\n• Dr. Vikram Patel — Cardiology\n\nUse the **Book Appointment** feature to schedule a visit!`;
    },
  },
  {
    patterns: [/\b(insurance|cashless|claim|tpa)\b/i],
    response: () => `💳 **Insurance & Cashless:**\n\nWe accept cashless claims from:\n${hospitalInfo.insurancePartners.map((p) => `• ${p}`).join('\n')}\n\nPlease carry your **insurance card** and **valid ID** for cashless processing.\n📍 Visit the **Insurance Desk** at the Reception for assistance.`,
  },
  {
    patterns: [/\b(lab|laboratory|test|blood|x-ray|scan|mri|ct)\b/i],
    response: () => `🔬 **Lab & Diagnostics:**\n\n⏰ Timings: ${hospitalInfo.labTimings}\n\n**Services available:**\n• Blood Tests (CBC, Lipid Profile, Thyroid, etc.)\n• X-Ray & Ultrasound\n• MRI & CT Scan\n• ECG & Echocardiogram\n• Pathology & Microbiology\n\n💡 Fasting blood tests: Please arrive before 9:00 AM without eating.`,
  },
  {
    patterns: [/\b(pharmacy|medicine|medical store|chemist)\b/i],
    response: () => `💊 **Pharmacy:**\n\n${hospitalInfo.pharmacy}\n\n• Located at the Ground Floor, near the Main Entrance\n• Both prescription and OTC medicines available\n• Accepts digital prescriptions`,
  },
  {
    patterns: [/\b(fee|cost|charge|price|payment|pay)\b/i],
    response: () => `💰 **Consultation Fees:**\n\n• General Consultation: **₹500 - ₹800**\n• Specialist Consultation: **₹800 - ₹1,500**\n• Emergency Consultation: **₹1,500**\n\n**Payment Methods:** Cash, UPI, Credit/Debit Cards, Net Banking\n\n💡 For exact fees, select a doctor in the **Book Appointment** section.`,
  },
  {
    patterns: [/\b(contact|address|location|where|reach|direction)\b/i],
    response: () => `📍 **Contact & Location:**\n\n🏥 ${hospitalInfo.address}\n📞 Helpline: ${hospitalInfo.emergencyContact}\n🚑 Ambulance: ${hospitalInfo.ambulance}\n\n🕐 OPD Hours: 9:00 AM - 5:00 PM (Mon-Sat)`,
  },
  {
    patterns: [/\b(thank|thanks|thx|appreciate)\b/i],
    response: () => `You're welcome! 😊 Is there anything else I can help you with? Feel free to ask anytime!\n\n💙 **CareSphere** — Caring for you, always.`,
  },
  {
    patterns: [/\b(bye|goodbye|see you|take care)\b/i],
    response: () => `Goodbye! 👋 Take care and stay healthy!\n\n🏥 **CareSphere Hospital** is always here for you. Don't hesitate to reach out if you need anything!\n\n📞 Helpline: ${hospitalInfo.emergencyContact}`,
  },
];

const defaultResponse = `I'm sorry, I didn't quite understand that. 🤔 **Please note that I am still under development.**\n\nHere are some things you can ask me about:\n• **"What departments do you have?"**\n• **"Tell me about your doctors"**\n• **"How do I book an appointment?"**\n• **"What are the visiting hours?"**\n• **"Emergency contact"**\n• **"Bed availability"**\n• **"Lab timings"**\n• **"Insurance partners"**\n\nPlease try again or type **"hi"** to start over!`;

// @desc    Process chatbot message
// @route   POST /api/chatbot
const processMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const userMsg = message.trim();

    for (const rule of rules) {
      for (const pattern of rule.patterns) {
        if (pattern.test(userMsg)) {
          const reply = typeof rule.response === 'function' ? await rule.response() : rule.response;
          return res.status(200).json({
            success: true,
            data: { reply, timestamp: new Date().toISOString() },
          });
        }
      }
    }

    // No pattern matched
    res.status(200).json({
      success: true,
      data: { reply: defaultResponse, timestamp: new Date().toISOString() },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { processMessage };
