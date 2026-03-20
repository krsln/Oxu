
export class DB {
  OquDB: any;

  Create() {

    // Surah Verse Word Letter
    const SchemaSurah = {
      keyCompression: true, // set this to true, to enable the keyCompression
      version: 0,
      title: 'Surah',
      primaryKey: {
        // where should the composed string be stored
        key: 'Seq',
        // fields that will be used to create the composed key
        fields: ['Name', 'Verses'],
        // separator which is used to concat the fields values.
        separator: '|'
      },
      type: 'object',
      properties: {
        Seq: {type: 'string', maxLength: 100},// <- the primary key must have set maxLength
        Name: {type: 'string'},
        Verses: {
          type: 'array', uniqueItems: true,
          items: {
            type: "object",
            properties: {
              Seq: {type: 'number'},
              Arabic: {"type": "string"},
              Pronunciation: {"type": "string"},
              Words: {
                type: 'array', uniqueItems: true,
                properties: {
                  Arabic: {"type": "string"},
                  Pronunciation: {"type": "string"},
                  Letters: {
                    type: 'array', uniqueItems: true,
                    properties: {
                      Type: {"type": "number"},
                      Ar: {"type": "string"},
                      Modified: {"type": "string"},
                      Latin: {"type": "string"},
                      Pattern: {"type": "string"}
                    }
                  }
                }
              }
            }
          }
        }
      },
      required: ['Id', 'Seq', 'Name']
    };

    this.OquDB({
      Surahs: {},
      // you can create multiple collections at once
      Verses: {
        // ...
      },
      Words: {
        // ...
      },
      Letters: {
        // ...
      },
    });
  }

  Export(): any {

  }

  Import(_exportedJSON: any) {
    // import the dump to the database
  }

  // Destroys the databases object-instance. This is to free up memory and stop all observers and replications.
  // Returns a Promise that resolves when the database is destroyed.
  async Destroy() {
  }

  // Wipes all documents from the storage. Use this to free up disc space.
  async Remove() {
    // database instance is now gone

  }
}
