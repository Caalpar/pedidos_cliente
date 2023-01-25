 export const PrintReport = (html) =>{


    let data = html.cloneNode(true)

    // borrar info

    // borrar titulo

    for (let index = 0; index < data.children.length; index++) {
        const element = data.children[index];
        console.log(element)
        for (let j = 0; j < element.children.length; j++) {
            const child = element.children[j];
            if(index == 0 && child.innerHTML == "Info"){
                child.remove()
                element.style.gridTemplateColumns = '10% 10% 10% 10% 10% 10% 10% 10% 10% 10%'
            }
            if(index == 1)    
            {
                child.style.gridTemplateColumns = '10% 10% 10% 10% 10% 10% 10% 10% 10% 10%'
               

                for (let k = 0; k < child.children.length; k++) {
                    const ord = child.children[k];
                    ord.style.gridTemplateColumns = '10% 10% 10% 10% 10% 10% 10% 10% 10% 10%'
                    ord.children[7].remove()
                }
            }
        }
    }


    let style = `
    <style>
    .print{
        margin: .5rem 1rem;
        cursor: pointer;
    }

    .date{
        text-align: center; padding: .3rem;
    }
    .footer-report{
        display: grid;
        grid-template-columns: auto auto auto;
        text-align: center;
        background-color: rgb(77, 77, 119);
        color: white;
        padding: 1rem;
    }
    .title-report{
        display: grid;
        grid-template-columns: 9% 9% 9% 9% 9% 9% 9% 9% 9% 9% 9%;
        margin: 1rem;
        align-items: center;
        justify-items: center;
        text-align: center;
        background-color: #04AA6D;
        color: white;
        padding: 1rem;
    }
    .container{
        display: grid;
        grid-template-columns: 9% 9% 9% 9% 9% 9% 9% 9% 9% 9% 9%;
        margin: 1rem;
        text-align: center;

    }

    .container-scroll{
        overflow-y: scroll;
        max-height: 50vh;
    }

    .container > div{

       border-bottom: 1px solid rgba(0, 0, 0, 0.116);
    }

    .scroll{
        overflow-y: scroll;
        max-height: 90vh;
    }

    .state{
        font-weight: bold;
    }

    .display-none{
        display: none !important;
    }

    </style>
    `




    let a = window.open('', '', 'height=500, width=1200');
    a.document.write('<html>');
    a.document.write(`<body>`);
    a.document.write(style);
    a.document.write(data.innerHTML);
    a.document.write('</body>');
    a.document.write('</html>');

 }