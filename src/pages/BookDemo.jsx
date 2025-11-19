import { useState } from 'react';
// import { Appointment } from '@/api/entities'; // Temporarily disabled - will be replaced with MongoDB API
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { format, setHours, setMinutes, setSeconds } from 'date-fns';
import { Calendar as CalendarIcon, User, Mail, Phone, Building, Briefcase, CheckCircle, ArrowLeft, Clock } from 'lucide-react';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'
];

export default function BookDemo() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dealershipName: '',
    role: ''
  });
  const [bookedAppointmentDetails, setBookedAppointmentDetails] = useState(null);

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBooking = async () => {
    if (!selectedDate || !selectedTime || !formData.fullName || !formData.email) {
      alert('Please fill all required fields and select a date/time.');
      return;
    }

    const [time, period] = selectedTime.split(' ');
    const [hoursStr, minutesStr] = time.split(':');
    let hours = parseInt(hoursStr);
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    
    let appointmentDateTime = setHours(selectedDate, hours);
    appointmentDateTime = setMinutes(appointmentDateTime, parseInt(minutesStr));
    appointmentDateTime = setSeconds(appointmentDateTime, 0);

    try {
      // TODO: Replace with MongoDB API call
      // await Appointment.create({
      //   full_name: formData.fullName,
      //   email: formData.email,
      //   phone: formData.phone,
      //   dealership_name: formData.dealershipName,
      //   role: formData.role,
      //   appointment_time: appointmentDateTime.toISOString()
      // });
      
      // Temporarily simulate success
      setBookedAppointmentDetails({
        name: formData.fullName,
        date: appointmentDateTime
      });
      setIsBooked(true);
      console.log('Appointment booking (temporarily disabled - will be replaced with MongoDB API)');
    } catch (error) {
      console.error('Booking failed:', error);
      alert('There was an error booking your demo. Please try again.');
    }
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white flex items-center justify-center p-4 relative overflow-hidden">
        <style>{`
          .holographic-text-green {
            background: linear-gradient(45deg, #4ade80, #16a34a, #22c55e, #4ade80);
            background-size: 300% 300%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: holographic-shine 3s ease-in-out infinite;
          }
          @keyframes holographic-shine {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes check-pulse {
            0%, 100% { transform: scale(1); box-shadow: 0 0 40px rgba(34, 197, 94, 0.4); }
            50% { transform: scale(1.1); box-shadow: 0 0 60px rgba(34, 197, 94, 0.8); }
          }
        `}</style>
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(0,128,255,0.2)_0%,_transparent_50%)]"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(circle_at_center,_rgba(74,222,128,0.2)_0%,_transparent_60%)]"></div>
        </div>

        <div className="text-center max-w-3xl relative z-10">
          <div className="w-28 h-28 mx-auto mb-8 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse" style={{animation: 'check-pulse 2s infinite ease-in-out'}}>
            <CheckCircle className="w-20 h-20 text-green-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Booking <span className="holographic-text-green">Confirmed</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Transmission received, <span className="text-blue-400 font-semibold">{bookedAppointmentDetails.name}</span>. 
            Your Omni.Lot demo is locked in.
          </p>
          
          <Card className="bg-slate-900/50 border-slate-700 p-8 mb-8 text-left backdrop-blur-sm shadow-2xl shadow-blue-500/10">
            <h2 className="text-2xl font-semibold mb-6 text-white text-center">Confirmation Details</h2>
            <div className="space-y-4">
              <div className="flex items-center text-lg text-gray-300">
                <CalendarIcon className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white">Date:</span>
                  <span className="ml-2">{format(bookedAppointmentDetails.date, 'EEEE, MMMM do, yyyy')}</span>
                </div>
              </div>
              <div className="flex items-center text-lg text-gray-300">
                <Clock className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white">Time:</span>
                  <span className="ml-2">{format(bookedAppointmentDetails.date, 'p')}</span>
                </div>
              </div>
              <div className="flex items-center text-lg text-gray-300">
                <User className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />
                <div>
                  <span className="font-semibold text-white">Attendee:</span>
                  <span className="ml-2">{formData.fullName}</span>
                </div>
              </div>
              {formData.dealershipName && (
                <div className="flex items-center text-lg text-gray-300">
                  <Building className="w-6 h-6 mr-4 text-blue-400 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-white">Dealership:</span>
                    <span className="ml-2">{formData.dealershipName}</span>
                  </div>
                </div>
              )}
            </div>
          </Card>
          
          <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-6 mb-8">
            <h3 className="text-xl font-semibold text-blue-300 mb-3">Next Steps:</h3>
            <ul className="text-gray-300 space-y-2 text-left max-w-md mx-auto list-disc list-inside">
              <li>A calendar invitation has been dispatched to your inbox.</li>
              <li>Prepare your questions for our AI specialists.</li>
              <li>Our team will establish a secure connection at the scheduled time.</li>
            </ul>
          </div>
          
          <Link to={createPageUrl('Landing')}>
            <Button variant="outline" className="border-gray-600 text-white hover:bg-gray-800 text-lg px-8 py-3 rounded-xl transition-all hover:border-blue-400 hover:text-blue-300">
              <ArrowLeft className="w-5 h-5 mr-2" />
              Return to Holo-Deck
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-slate-900 to-black text-white p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      <style>{`
        .holographic-text {
          background: linear-gradient(45deg, #60a5fa, #3b82f6, #1d4ed8, #60a5fa);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: holographic-shine 3s ease-in-out infinite;
        }
        @keyframes holographic-shine {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .futuristic-card {
          background: rgba(15, 23, 42, 0.5); /* slate-900/50 */
          backdrop-filter: blur(12px);
          border: 1px solid rgba(51, 65, 85, 1); /* slate-700 */
          transition: all 0.3s ease;
        }
        .futuristic-card:hover {
          border-color: rgba(96, 165, 250, 0.5); /* blue-400/50 */
          box-shadow: 0 0 40px rgba(59, 130, 246, 0.1);
        }
        .time-slot-btn {
          background: rgba(30, 41, 59, 0.7); /* slate-800/70 */
          border: 1px solid rgba(51, 65, 85, 1); /* slate-700 */
          color: #fff; /* White text for unselected buttons */
          transition: all 0.2s ease;
        }
        .time-slot-btn:hover {
          background: rgba(59, 130, 246, 0.2);
          border-color: rgba(59, 130, 246, 0.7);
          color: #fff;
        }
        .time-slot-btn.selected {
          background: rgba(59, 130, 246, 1); /* blue-600 */
          border-color: rgba(96, 165, 250, 1); /* blue-400 */
          color: #fff;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        .futuristic-input {
          background: rgba(15, 23, 42, 0.7); /* slate-900/70 */
          border-color: rgba(51, 65, 85, 1); /* slate-700 */
          color: #fff; /* White text */
        }
        .futuristic-input::placeholder {
          color: #fff; /* White placeholder text */
          opacity: 0.8; /* Slightly transparent */
        }
        .futuristic-input:focus {
          border-color: #3b82f6; /* blue-600 */
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
        }

        /* Floating Bubbles Animation */
        @keyframes float-bubble {
          0% {
            transform: translateY(100vh) scale(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-10vh) scale(1);
            opacity: 0;
          }
        }

        @keyframes fade-pulse {
          0%, 100% {
            opacity: 0.1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.1);
          }
        }

        .floating-bubble {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }

        .bubble-1 {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.4), rgba(255, 255, 255, 0.1));
          left: 10%;
          animation: float-bubble 8s infinite linear, fade-pulse 3s infinite ease-in-out;
          animation-delay: 0s, 1s;
        }

        .bubble-2 {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, rgba(147, 197, 253, 0.3), rgba(255, 255, 255, 0.2));
          left: 20%;
          animation: float-bubble 12s infinite linear, fade-pulse 4s infinite ease-in-out;
          animation-delay: 2s, 0.5s;
        }

        .bubble-3 {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, rgba(96, 165, 250, 0.3), rgba(255, 255, 255, 0.1));
          left: 70%;
          animation: float-bubble 10s infinite linear, fade-pulse 5s infinite ease-in-out;
          animation-delay: 4s, 2s;
        }

        .bubble-4 {
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, rgba(29, 78, 216, 0.4), rgba(255, 255, 255, 0.15));
          left: 80%;
          animation: float-bubble 15s infinite linear, fade-pulse 3.5s infinite ease-in-out;
          animation-delay: 6s, 1.5s;
        }

        .bubble-5 {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, rgba(219, 234, 254, 0.4), rgba(59, 130, 246, 0.2));
          left: 50%;
          animation: float-bubble 9s infinite linear, fade-pulse 4.5s infinite ease-in-out;
          animation-delay: 8s, 0s;
        }

        .bubble-6 {
          width: 35px;
          height: 35px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.3), rgba(255, 255, 255, 0.2));
          left: 30%;
          animation: float-bubble 11s infinite linear, fade-pulse 3.8s infinite ease-in-out;
          animation-delay: 3s, 2.5s;
        }

        .bubble-7 {
          width: 70px;
          height: 70px;
          background: linear-gradient(135deg, rgba(191, 219, 254, 0.2), rgba(59, 130, 246, 0.3));
          left: 85%;
          animation: float-bubble 13s infinite linear, fade-pulse 5.2s infinite ease-in-out;
          animation-delay: 1s, 3s;
        }

        .bubble-8 {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(96, 165, 250, 0.2));
          left: 5%;
          animation: float-bubble 14s infinite linear, fade-pulse 4.2s infinite ease-in-out;
          animation-delay: 7s, 1.8s;
        }
      `}</style>
      
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(0,128,255,0.2)_0%,_transparent_40%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_rgba(0,128,250,0.2)_0%,_transparent_40%)]"></div>
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse"></div>

      {/* Floating Bubbles */}
      <div className="floating-bubble bubble-1"></div>
      <div className="floating-bubble bubble-2"></div>
      <div className="floating-bubble bubble-3"></div>
      <div className="floating-bubble bubble-4"></div>
      <div className="floating-bubble bubble-5"></div>
      <div className="floating-bubble bubble-6"></div>
      <div className="floating-bubble bubble-7"></div>
      <div className="floating-bubble bubble-8"></div>

      <div className="max-w-6xl mx-auto py-12 relative z-10">
        <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Schedule Your <span className="holographic-text">AI Demo</span>
            </h1>
            <p className="text-lg text-gray-300">Interface with our platform and discover the future of dealership automation.</p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Date & Time */}
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-white">
                <CalendarIcon className="w-6 h-6 mr-3 text-blue-400" />
                Select Transmission Date & Time
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="flex justify-center">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  disabled={{ before: new Date() }}
                  className="rounded-md bg-transparent"
                  classNames={{
                    months: "flex flex-col space-y-4",
                    month: "space-y-4",
                    caption_label: 'text-white font-semibold text-lg',
                    nav_button: 'text-white hover:bg-slate-800',
                    table: "w-full border-collapse space-y-3",
                    head_row: "grid grid-cols-7 gap-2",
                    head_cell: 'text-gray-400 text-sm tracking-wide text-center',
                    row: "grid grid-cols-7 gap-2",
                    cell: "text-center",
                    day: 'text-white h-9 w-9 md:h-10 md:w-10 flex items-center justify-center rounded-xl text-base hover:bg-slate-800 transition-all duration-200 mx-auto',
                    day_selected: "bg-blue-600 text-white hover:bg-blue-600 focus:bg-blue-600 rounded-xl ring-2 ring-blue-400 shadow-lg shadow-blue-500/30",
                    day_today: "bg-slate-800/60 text-white rounded-xl",
                    day_outside: 'text-gray-600 opacity-50',
                    day_disabled: 'text-gray-600 opacity-50',
                  }}
                />
              </div>
              <div>
                <p className="font-semibold mb-4 text-center md:text-left text-white">{selectedDate ? format(selectedDate, 'EEEE, MMMM do') : 'Select a date'}</p>
                <div className="grid grid-cols-2 gap-3 max-h-72 overflow-y-auto pr-2">
                  {timeSlots.map((time) => (
                    <Button
                      key={time}
                      variant="ghost"
                      onClick={() => setSelectedTime(time)}
                      className={`time-slot-btn w-full text-base ${selectedTime === time ? 'selected' : ''}`}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Right Column: User Info */}
          <Card className="futuristic-card">
            <CardHeader>
              <CardTitle className="flex items-center text-2xl text-white">
                <User className="w-6 h-6 mr-3 text-blue-400" />
                Enter Your Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
                {renderInput('fullName', 'Full Name', User)}
                {renderInput('email', 'Email Address', Mail)}
                {renderInput('phone', 'Phone Number', Phone)}
                {renderInput('dealershipName', 'Dealership Name', Building)}
                {renderInput('role', 'Your Role', Briefcase)}
              <Button onClick={handleBooking} size="lg" className="w-full text-lg bg-blue-600 hover:bg-blue-500 mt-4 transition-all hover:shadow-lg hover:shadow-blue-500/30">
                Confirm Booking
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  function renderInput(name, placeholder, Icon) {
      return (
          <div className="relative">
              <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                  name={name}
                  value={formData[name]}
                  onChange={handleFormChange}
                  placeholder={placeholder}
                  required={name === 'fullName' || name === 'email'}
                  className="pl-10 h-12 text-white futuristic-input"
              />
          </div>
      );
  }
}
