export class RDV {
    constructor (user, start, end) {
      this.user = user;
      this.start = start;
      this.end = end;
    }
}
export const RDVConverter = {
    toFirestore: function(rdv) {
        return {
            user: rdv.user,
            start: rdv.start,
            end: rdv.end
            };
    },
    fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new RDV(data.user, data.start, data.end);
    }
}
