import Moment from "moment";
import "moment/locale/es";
import { tr } from "date-fns/locale";

const fecha = {
  isDate: (date, format) => {
    Moment.locale('es');
    const formato = format || "YYYY-MM-DD";
    return Moment(date, formato).isValid();
  },
  extractShortDateFromISO: (d) => `${d.substring(8, 10)}/${(d.substring(5, 7))}/${d.substring(0, 4)}`,
  toShortDate: (d) => {
    let newDate;
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (isNaN(d.getTime())) {
        return "";
      }
    }
    if (/^(-?(?:[1-9][0-9]*)?[0-9]{4})-(1[0-2]|0[1-9])-(3[01]|0[1-9]|[12][0-9])T(2[0-3]|[01][0-9]):([0-5][0-9]):([0-5][0-9])(.[0-9]+)?(Z)?$/g.test(d)) {
      newDate = `${d.substring(8, 10)}/${(d.substring(5, 7))}/${d.substring(0, 4)}`;
    } else if (newDate) {
      if (newDate.lenght === 10) {
        newDate = new Date(d).toISOString();
        return `${newDate.substring(8, 10)}/${(newDate.substring(5, 7))}/${newDate.substring(0, 4)}`;
      }
      return newDate;
    } else {
      return "";
    }
    return newDate;
  },
  formatDate: (date, format, utc = false) => {
    Moment.locale('es');
    const formato = format || "DD-MM-YYYY";
    if (utc) {
      const utcresult = Moment(date).isValid() ? Moment.utc(date, "YYYY-MM-DD HH:mm:ss").local().format(formato) : "";
      return utcresult;
    }
    const result = Moment(date).isValid() ? Moment(date, "YYYY-MM-DD HH:mm:ss").format(formato) : "";
    return result;
  },
  showHours: (date) => {
    Moment.locale('es');
    return Moment(date).format("HH:mm");
  },
  toRangeDate: (dateInicio, dateFin) => {
    Moment.locale('es');
    return `${Moment(dateInicio).format("L")} - ${dateFin ? Moment(dateFin).format("L") : "En curso"}`;
  },
  addDate: (date, duracion, periodo) => {
    Moment.locale('es');
    return Moment(new Date(date), "DD-MM-YYYY").add(duracion, periodo);
  },
  compareDates: (dateIni, dataEnd) => {
    Moment.locale('es');
    const fini = Moment(dateIni);
    const ffin = Moment(dataEnd);
    return ffin.isAfter(fini, "day");
  },
  itemVigente: (dateFin) => {
    Moment.locale('es');
    let result = true;
    if (dateFin) {
      result = Moment(dateFin).isSameOrAfter(Moment(), "day");
    }
    return result;
  },
  anioMin: (annioInicio) => {
    Moment.locale('es');
    let result = true;
    if (annioInicio) {
      const a = Moment(new Date(), "DD-MM-YYYY").subtract(100, "years");
      if (annioInicio < a.year()) {
        result = false;
      }
    }
    return result;
  },
  anioMax: (annioFin) => {
    Moment.locale('es');
    let result = true;
    if (annioFin) {
      const a = Moment(new Date(), "DD-MM-YYYY").add(100, "years");

      if (annioFin > a.year()) {
        result = false;
      }
    }
    return result;
  },
  disableWeekends: (date) => date.day() === 0 || date.day() === 6,
  disableEndOfMonth: (date) => date.date() >= 25,
  isMinorThanMaxDate: (maxDate) => {
    if (maxDate > new Date()) {
      return true;
    }
    return false;
  },
  dateIniAfterToday: (fechaInicio) => {
    Moment.locale('es');
    let result = false;
    if (fechaInicio) {
      result = Moment(fechaInicio).isAfter(Moment(), "day");
    }
    return result;
  },
  dateToFromNowDaily(date) {
    const fromNow = Moment(date).format("LL");
    return Moment(date).calendar(null, {
      lastDay: "[Ayer]",
      sameDay: "[Hoy]",
      nextDay: "[Mañana]",
      nextWeek: "dddd",
      sameElse: () => `[${fromNow}]`,
    });
  },
  calculateAge: (birthDate) => {
    if (birthDate instanceof Date) {
      return Moment().diff(Moment(birthDate), "years");
    }
    return "";
  },
  ageValidation: (currentBirthDate) => {
    const age = Moment().diff(Moment(currentBirthDate, 'DD/MM/YYYY'), "years");
    return age >= 18;
  },
  buildValidDateObject(validDateString) {
    try {
      const [day, month, year] = validDateString.split("/");
      const d = Moment(new Date(Number(year), Number(month) - 1, Number(day)));
      if ((d.month() === (Number(month) - 1) && d.dates() === Number(day)) && !isNaN(d) && (/(0[1-9]|[12][0-9]|3[01])[- \/.](0[1-9]|1[012])[- \/.](19|20)\d\d/g.test(validDateString))) {
        return d;
      }
      return false
    } catch (err) {
      return false;
    }
  },

};

export default fecha;
