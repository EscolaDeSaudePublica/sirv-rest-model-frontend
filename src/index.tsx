import * as React from "react";
import * as ReactDOM from "react-dom";
import Slider from '@material-ui/core/Slider';



console.log(process.env.REACT_APP_BASE_URL_);
const domain = process.env.REACT_APP_BASE_URL_;


const marks_dias = [


    {
        value: 0,
        label: '0',
    },


    {
        value: 10,
        label: '10 dias',
    },

    {
        value: 30,
        label: '30 dias',
    },

    {
        value: 90,
        label: '90',
    },


];

const marks_infectados = [



    {
        value: 9000,
        label: '9000 pessoas',
    },

    {
        value: 15000,
        label: '15000 pessoas',
    },

    {
        value: 60000,
        label: '60000',
    },


];


const marks_velocidade = [

    {
        value: 0,
        label: '0',
    },


    {
        value: 24000,
        label: '24000',
    },

    {
        value: 290000,
        label: '290000',
    },

  

];

const marks = [

   

    {
        value: 0.5,
        label: '50% de eficacia',
    },

    {
        value: 0.75,
        label: '75% de eficacia',
    },

    {
        value: 0.90,
        label: '90% de eficacia',
    },


];





class FormSIRV extends React.Component {
   


    state = {
        vaccine_efficacy: 0.5,
        velocidade_vacinacao: 0.001,
        quantidade_infectados: 0,
        dias_nova_infeccao:10,
        random: 0,
        figure: '',
        domain:'',

        
    };

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ vaccine_efficacy: e.currentTarget.value });
    };

    


 

   


    resetIframe() {
        this.setState({ random: this.state.random + 1 });
    }


    

    handleChange = (event, newValue) => {
        this.setState({ vaccine_efficacy: newValue });
    };

    handleChange_velocidade = (event, newValue) => {
        this.setState({ velocidade_vacinacao: newValue });
    };


    handleChange_quantidade_infectados = (event, newValue) => {
        this.setState({ quantidade_infectados: newValue });
    };

    handleChange_dias_nova_infeccao = (event, newValue) => {
        this.setState({ dias_nova_infeccao: newValue });
    };

    
     

  
    public render() {
        return (

            <React.Fragment >
            <div>
           

                 <label>
                        Eficácia da Vacina:
                <Slider
                    orientation="horizontal"
                    defaultValue={0.5}
                    step={0.05}
                    min={0}
                    max={1}
                    valueLabelDisplay="auto"
                    aria-labelledby="vertical-slider"
                    marks={marks}
                    onChange={this.handleChange}
                    />
                    </label><br />


                    <label>
                        Velocidade de  Vacinação:
                        <Slider
                            orientation="horizontal"
                            defaultValue={9000}
                            step={1}
                            min={0}
                            max={300000}
                            valueLabelDisplay="auto"
                            aria-labelledby="vertical-slider"
                            marks={marks_velocidade}
                            onChange={this.handleChange_velocidade}
                        />
                    </label><br />

                    <label>
                        Quantidade de novos infectados no modelo:
                        <Slider
                            orientation="horizontal"
                            defaultValue={0}
                            step={1}
                            min={0}
                            max={60000}
                            valueLabelDisplay="auto"
                            aria-labelledby="vertical-slider"
                            marks={marks_infectados}
                            onChange={this.handleChange_quantidade_infectados}
                        />
                    </label><br />


                    <label>
                        Quantidade de dias entre novas infecções:
                        <Slider
                            orientation="horizontal"
                            defaultValue={0}
                            step={1}
                            min={0}
                            max={90}
                            aria-labelledby="vertical-slider"
                            marks={marks_dias}
                            valueLabelDisplay="auto"
                            onChange={this.handleChange_dias_nova_infeccao}
                        />
                    </label><br />
                    <button onClick={() => { this.resetIframe(); }}>Simular</button><br />

                    <iframe key={this.state.random} src={process.env.REACT_APP_BASE_URL_ + "/" + this.state.vaccine_efficacy + "/" + (this.state.velocidade_vacinacao / 9000000) + "/" + (this.state.quantidade_infectados / 9000000) + "/" + this.state.dias_nova_infeccao+"/0/"} width="90%"
                        height="500px"></iframe>

                
                    
                </div>


            </React.Fragment >
        );
    }
}

ReactDOM.render(<FormSIRV />, document.getElementById("root"));
