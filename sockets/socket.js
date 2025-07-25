const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands')

const bands = new Bands();

bands.addBand(new Band('Breaking Benjamin'));
bands.addBand(new Band('Bon Jovi'));
bands.addBand(new Band('Heroes del silencio'));
bands.addBand(new Band('Metalica'));

console.log(bands);

// Mensajes de sockets
io.on('connection', client => {
    
    console.log('Cliente conectado')

    client.emit('active-bands',bands.getBands())

    client.on('disconnect', () => { 
        console.log('Cliente desconectado')
    });

    client.on('mensaje',(payload)=> {
        console.log('Mensaje!!!',payload);

        io.emit('mensaje',{admin: 'Nuevo mensajea'});
    });

    // client.on('emitir-mensaje',(payload)=>{
    //     console.log('emitir-mensaje!!!',payload);
    //     client.broadcast.emit('nuevo-mensaje',payload);
    // })
    client.on('vote-band',(payload)=>{
        // console.log(payload);
        bands.voteBand(payload.id);
        io.emit('active-bands',bands.getBands())
    })
    
    client.on('delete-band',(payload)=>{
        // console.log(payload);
        bands.deleteBand(payload.id);
        io.emit('active-bands',bands.getBands())
    })

    client.on('add-band',(payload)=>{
        // console.log(payload);
        const newBand = new Band(payload.name)
        bands.addBand(newBand);
        io.emit('active-bands',bands.getBands())
    })
});


