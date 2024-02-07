function showMethodolgyDiv() {
    const animateDiv = document.getElementById("method__div");
    animateDiv.classList.add("animate__fadeInDown");
    animateDiv.style.display = "none";
    animateDiv.style.opacity = "1";

    animateDiv.offsetHeight;

    animateDiv.style.display = "flex";
}

function hideMethodolgyDiv() {
    const animateDiv = document.getElementById("method__div");
    // animateDiv.style.opacity = "0";
    animateDiv.classList.add("animate__backOutUp");
    animateDiv.style.display = "flex";
    animateDiv.offsetHeight;
    animateDiv.style.display = "none";
}


let services = ['End to End Automation', 'Software Development', 'Integration with Website/s', 'SMS / Email engines', 'Andriod App Development', 'ERP Integration']
// let services = ['End to End Automation', 'Software Development']
document.addEventListener('DOMContentLoaded', function () {
    AOS.init();
    let responsiveWidth;

    if(window.innerWidth < 768) {
        responsiveWidth = 100;
    } else if(window.innerWidth < 1024) {
        responsiveWidth = 200;
    } else if(window.innerWidth < 1280) {
        responsiveWidth = 300;
    } else if(window.innerWidth < 1440) {
        responsiveWidth = 400;
    } else if(window.innerWidth < 1920) {
        responsiveWidth = 500;
    } else {
        responsiveWidth = 600;
    }

    const canva = document.getElementById('Hero__Services__Container__Canvas')
    canva.position = 'relative'
    // Create an engine
    const engine = Matter.Engine.create();
    // Create a renderer
    const render = Matter.Render.create({
        element: document.getElementById('Hero__Services__Container__Canvas'),
        engine: engine,
        options: {
            width: window.innerWidth > 500 ? 500 : 800,
            height: window.innerWidth > 500 ? 300 : 800,
            wireframes: false,
            background: 'transparent',
        }
    });

    const leftwall =  Matter.Bodies.rectangle(
        1, // X-coordinate
        0, // Y-coordinate (bottom of the screen)
        1, // Width (equal to canvas width)
        2000,  // Height (adjust as needed)
        { isStatic: true, render: { fillStyle: 'transparent' } } // Set to static and add a fill color
    );
    const rightwall =  Matter.Bodies.rectangle(
        window.innerWidth > 500 ? 480 : 500, // X-coordinate
        0, // Y-coordinate (bottom of the screen)
        1, // Width (equal to canvas width)
        2000,  // Height (adjust as needed)
        { isStatic: true, render: { fillStyle: 'transparent' } } // Set to static and add a fill color
    );
    const ground =  Matter.Bodies.rectangle(
        250, // X-coordinate
        window.innerWidth > 500 ? 400 : 400, // Y-coordinate (bottom of the screen)
        800, // Width (equal to canvas width)
        10,  // Height (adjust as needed)
        { isStatic: true, render: { fillStyle: 'transparent' } } // Set to static and add a fill color
    );
            
    // setTimeout(() => {
        const fallingDivs = [];
        const customBodies = [];
        let collidePosition = {};
        for (let i = 0; i < services.length; i++) {
            const canva = document.getElementById('Hero__Services__Container__Canvas');
            const customDiv = document.createElement('div');
            // customDiv.appendChild
            customDiv.className = 'custom-div';
            customDiv.id = 'custom-div';
            customDiv.textContent = services[i]
            customDiv.style.visibility = 'none';
            document.getElementById('Hero__Services__Container__Canvas').appendChild(customDiv);

            let xpos = window.innerWidth > 500 ? Math.random() * 100 : Math.random() * 100;
            const customBody = Matter.Bodies.rectangle(
                xpos,
                -800,
                window.innerWidth > 500 ? customDiv.clientWidth : 1200,
                window.innerWidth > 500 ? customDiv.clientHeight : 800,
                { restitution: 0.5, friction: 0.1, render: { fillStyle: 'transparent' } }
            );
            customBodies.push(customBody);

            fallingDivs.push({customDiv: customDiv, xpos: customBody.position.x});
        }

        // collide div
        const methodologBox = document.createElement('div');
        methodologBox.textContent = 'OWN METHODOLOGY'
        methodologBox.className = 'methodology__txt'
        const collidingBody = Matter.Bodies.rectangle(
            700, 
            window.innerWidth > 500 ? 280 : 200,
            255, 150,
            // methodologBox.clientWidth, methodologBox.clientHeight,
            { restitution: 0.01, friction: 0.1, density: 0.01, render: { fillStyle: 'transparent' } }
        )
        
        Matter.World.add(engine.world, [leftwall, rightwall, ground, ...customBodies]);
        Matter.Engine.run(engine);
        // Run the engine
        
        // Update the position of the custom divs based on the physics simulation
        Matter.Events.on(engine, 'afterUpdate', function () {
            fallingDivs.forEach((customDiv, index) => {
                const customBody = customBodies[index];
                customDiv.customDiv.style.transform = `translate(${customBody.position.x - (window.innerWidth > 500 ? 110 : 165)}px, ${customBody.position.y - (window.innerWidth > 500 ? 430 : (400))}px) rotate(${customBody.angle}rad)`;
            });
            methodologBox.style.transform = `translate(${collidingBody.position.x -  200}px, ${collidingBody.position.y - (window.innerWidth > 500 ? 450 : 400)}px)`;
            if(document.getElementById('Hero__Services__Container__Canvas') == null){
                return
            }
            document.getElementById('Hero__Services__Container__Canvas').appendChild(methodologBox);
            collidePosition = { x: collidingBody.position.x, y: collidingBody.position.y }
        });

        // Run the renderer
        Matter.Render.run(render);
    // }, 1000)


    setTimeout(() => {
        Matter.World.remove(engine.world, [leftwall, rightwall])
        // Matter.Body.applyForce(collidingBody, { x: 0, y: 0}, { x: -6.5, y: 0 });
        Matter.Body.setVelocity(collidingBody, { x: -16, y: 0});
        Matter.World.add(engine.world, [collidingBody]);
        methodologBox.style.visibility = 'visible'
    }, 5500)

    setTimeout(() => {
        fallingDivs.forEach((div) => {
            div.customDiv.style.display = 'none'
        })
        Matter.World.remove(engine.world, [...customBodies])
        // Matter.Sleeping.set(methodologBox, true);
        // Matter.Body.setPosition(collidingBody, { x: 200, y: 510 })
    }, 6500)

    setTimeout(() => {
        
        const newMethodTxt = document.getElementById('Methodology__Txt__Container_anim')
        newMethodTxt.style.display = 'flex'
        setTimeout(() => {
            const heroMainAnimContainer = document.getElementById('Hero__Main_anim__Container');
            heroMainAnimContainer.classList = 'animate__animated animate__fadeOut'
            // heroMainAnimContainer.style.visibility = 'hidden';
            const canvas = document.getElementsByTagName('canvas')[0]
            const canvas_contents = document.getElementById('Hero__Main_anim__Container')
            
            // const canvas_contents = document.getElementById('custom-div')
            canvas.remove()
            canvas_contents.remove()
        }, responsiveWidth < 500 ? 1000 : 2000);
      
        // newMethodTxt.classList = 'animate__animated animate__fadeIn'
        // newMethodTxt.style.transform = `translate(${collidePosition.x}px, ${collidePosition.y}px)`
    }, 10000)
});

var cube = document.querySelector('.cube');
var cube2 = document.querySelector('.cube2');
var cube3 = document.querySelector('.cube3');
var currentClass = 'show-front';
var currentClass2 = 'show-front';
var currentClass3 = 'show-front';

function changeSide(e) {
    if(e === 'enter'){
        var showClass = 'show-back';
        if ( currentClass ) {
            cube.classList.remove( currentClass );
        }
        cube.classList.add( showClass );
        currentClass = showClass;
    } if(e === 'leave') {
        var showClass = 'show-front';
        if ( currentClass ) {
            cube.classList.remove( currentClass );
        }
        cube.classList.add( showClass );
        currentClass = showClass;
    }
    if(e === 'click'){
        if ( currentClass === 'show-front' ) {
            cube.classList.remove( currentClass );
            currentClass = 'show-back'
            cube.classList.add( currentClass );
            return
        }

        if( currentClass === 'show-back' ){
            cube.classList.remove( currentClass );
            currentClass = 'show-front';
            cube.classList.add( currentClass );
            return
        }

    }
}

function changeSide2(e) {
    if(e === 'enter'){
        var showClass = 'show-back';
        if ( currentClass2 ) {
            cube2.classList.remove( currentClass2 );
        }
        cube2.classList.add( showClass );
        currentClass2 = showClass;
    } if(e === 'leave') {
        var showClass = 'show-front';
        if ( currentClass2 ) {
            cube2.classList.remove( currentClass2 );
        }
        cube2.classList.add( showClass );
        currentClass2 = showClass;
    }
    if(e === 'click'){
        if ( currentClass2 === 'show-front' ) {
            cube2.classList.remove( currentClass2 );
            currentClass2 = 'show-back'
            cube2.classList.add( currentClass2 );
            return
        }

        if( currentClass2 === 'show-back' ){
            cube2.classList.remove( currentClass2 );
            currentClass2 = 'show-front';
            cube2.classList.add( currentClass2 );
            return
        }

    }
}

function changeSide3(e) {
    if(e === 'enter'){
        var showClass = 'show-back';
        if ( currentClass3 ) {
            cube3.classList.remove( currentClass3 );
        }
        cube3.classList.add( showClass );
        currentClass3 = showClass;
    } if(e === 'leave') {
        var showClass = 'show-front';
        if ( currentClass3 ) {
            cube3.classList.remove( currentClass3 );
        }
        cube3.classList.add( showClass );
        currentClass3 = showClass;
    }
    if(e === 'click'){
        if ( currentClass3 === 'show-front' ) {
            cube3.classList.remove( currentClass3 );
            currentClass3 = 'show-back'
            cube3.classList.add( currentClass3 );
            return
        }

        if( currentClass3 === 'show-back' ){
            cube3.classList.remove( currentClass3 );
            currentClass3 = 'show-front';
            cube3.classList.add( currentClass3 );
            return
        }

    }
}
// set initial side
changeSide();

cube.addEventListener( 'mouseenter', () => {
    changeSide('enter') }
);
cube.addEventListener( 'mouseleave', () => {
    changeSide('leave') 
}
);
cube.addEventListener('click', () => {
    changeSide('click')
})

cube2.addEventListener( 'mouseenter', () => {
    changeSide2('enter') }
);
cube2.addEventListener( 'mouseleave', () => {
    changeSide2('leave') 
}
);
cube2.addEventListener('click', () => {
    changeSide2('click')
})

changeSide2()

cube3.addEventListener( 'mouseenter', () => {
    changeSide3('enter') }
);
cube3.addEventListener( 'mouseleave', () => {
    changeSide3('leave') 
}
);
cube3.addEventListener('click', () => {
    changeSide3('click')
})

changeSide3()