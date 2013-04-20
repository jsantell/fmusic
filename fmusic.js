(function (root) {

  var fmusic = {};

  fmusic.Note = Note;

  function Note (note, duration, time) {
    var _note = new Pitch(note);
    var _duration = duration;
    var _time = time;
    return Object.create(Object.prototype, {
      note: {
        get: function () { return _note; },
        set: _note.set.bind(_note)
      }
    });
  }

  var Pitch = function Pitch (note) {
    this.note = note;
  };

  Pitch.prototype = {
    set: function (note) {
      this.note = typeof note !== 'string' ? numberToNote(note) : note;
    },
    valueOf: function () { return noteToNumber(this.note); },
    toString: function () { return this.note; }
  };

  // Utilities

  var notes = 'C C# D D# E F F# G G# A A# B'.split(' ');

  function getNoteData (note) {
    var data = note.match(/^(\w#?)(\d)$/);
    return { note: data[1], octave: data[2] };
  }

  function noteToNumber (note) {
    var data = getNoteData(note);
    return notes.indexOf(data.note) + (data.octave * 12);
  }

  function numberToNote (num) {
    return notes[num % 12] + ~~(num / 12);
  }

  root.fmusic = fmusic;
})(this);
