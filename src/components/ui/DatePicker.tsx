'use client';

import { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  minDate?: string;
  label?: string;
  required?: boolean;
}

export default function DatePicker({ value, onChange, minDate, label, required = false }: DatePickerProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const handleDateClick = (day: number) => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const selectedDate = new Date(year, month, day);
    const dateString = selectedDate.toISOString().split('T')[0];

    if (minDate && dateString < minDate) return;

    onChange(dateString);
    setShowCalendar(false);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const isDateDisabled = (day: number) => {
    if (!minDate) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateString = new Date(year, month, day).toISOString().split('T')[0];
    return dateString < minDate;
  };

  const isSelectedDate = (day: number) => {
    if (!value) return false;
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const dateString = new Date(year, month, day).toISOString().split('T')[0];
    return dateString === value;
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <div className="relative" ref={calendarRef}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <Calendar className="w-4 h-4 inline mr-1" />
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <button
        type="button"
        onClick={() => setShowCalendar(!showCalendar)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-left flex items-center justify-between hover:border-blue-400 transition-colors"
      >
        <span className={value ? 'text-gray-900' : 'text-gray-400'}>
          {value ? formatDateDisplay(value) : 'Seleccionar fecha...'}
        </span>
        <Calendar className="w-5 h-5 text-gray-400" />
      </button>

      {showCalendar && (
        <div className="absolute z-50 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 p-4 w-full md:w-96 animate-fade-in">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={goToPreviousMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-gray-600" />
            </button>
            <h3 className="text-lg font-semibold text-gray-900 capitalize">
              {monthName}
            </h3>
            <button
              type="button"
              onClick={goToNextMonth}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before month starts */}
            {Array.from({ length: startingDayOfWeek }).map((_, index) => (
              <div key={`empty-${index}`} />
            ))}

            {/* Days of the month */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const disabled = isDateDisabled(day);
              const selected = isSelectedDate(day);

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => !disabled && handleDateClick(day)}
                  disabled={disabled}
                  className={`
                    aspect-square p-2 text-sm rounded-lg transition-all
                    ${selected
                      ? 'bg-blue-600 text-white font-bold shadow-lg scale-105'
                      : disabled
                      ? 'text-gray-300 cursor-not-allowed'
                      : 'hover:bg-blue-50 text-gray-700 hover:text-blue-600 hover:font-semibold'
                    }
                  `}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Today Button */}
          <button
            type="button"
            onClick={() => {
              const today = new Date().toISOString().split('T')[0];
              if (!minDate || today >= minDate) {
                onChange(today);
                setShowCalendar(false);
              }
            }}
            className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Hoy
          </button>
        </div>
      )}
    </div>
  );
}
