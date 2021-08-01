import * as React from "react";
import * as ReactDOM from "react-dom";
import { useRef, useLayoutEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import TextField from '@material-ui/core/TextField';


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
        value: 10000,
        label: '10k',
    },
    {
        value: 20000,
        label: '20k',
    },
    {
        value: 30000,
        label: '30',
    },
    {
        value: 40000,
        label: '40k',
    },
    {
        value: 50000,
        label: '50k',
    },
    {
        value: 60000,
        label: '60k',
    },
    {
        value: 70000,
        label: '70k',
    },
    {
        value: 80000,
        label: '80k',
    },
    {
        value: 90000,
        label: '90k',
    },
    {
        value: 100000,
        label: '100k',
    },
    {
        value: 110000,
        label: '110k',
    },
    {
        value: 120000,
        label: '120k',
    },
    {
        value: 130000,
        label: '130k',
    },
    {
        value: 140000,
        label: '140k',
    },
    {
        value: 150000,
        label: '150k',
    },
    {
        value: 160000,
        label: '160k',
    },
    {
        value: 160000,
        label: '160k',
    },
    {
        value: 170000,
        label: '170k',
    },
    {
        value: 180000,
        label: '180k',
    },
    {
        value: 190000,
        label: '190k',
    },
    {
        value: 200000,
        label: '200k',
    },
    {
        value: 210000,
        label: '210k',
    },
    {
        value: 220000,
        label: '220k',
    },
    {
        value: 230000,
        label: '230k',
    },
    {
        value: 240000,
        label: '240k',
    },
    {
        value: 250000,
        label: '250k',
    },
    {
        value: 260000,
        label: '260k',
    },
    {
        value: 250000,
        label: '250k',
    },

    {
        value: 260000,
        label: '260k',
    },
    {
        value: 270000,
        label: '270k',
    },
    {
        value: 280000,
        label: '280k',
    },

    {
        value: 290000,
        label: '290k',
    },

  

];

const marks = [

    {
        value: 0.25,
        label: '25% ',
    },

    {
        value: 0.5,
        label: '50% ',
    },

    {
        value: 0.75,
        label: '75% ',
    },

    {
        value: 0.90,
        label: '90%',
    },


];





class FormSIRV extends React.Component {
    private stepInput: React.RefObject<HTMLSpanElement>;
    
    


    constructor(props) {
        super(props);
        this.stepInput = React.createRef();
    }
   


    state = {
        vaccine_efficacy: 0.5,
        velocidade_vacinacao: 0.001,
        quantidade_infectados: 0,
        dias_nova_infeccao:10,
        random: 0,
        figure: '',
        domain: '',
        first_dose_efficacy: 0.5,
        second_dose_efficacy: 0.5,
        speed_first_dose: 9000,
        speed_second_dose: 9000,

        
        
   

        
    };

    onChange = (e: React.FormEvent<HTMLInputElement>): void => {
        this.setState({ vaccine_efficacy: e.currentTarget.value });
    };

    


 

   


    resetIframe() {
        this.setState({ random: this.state.random + 1 });
    }


    calc_vaccine_efficacy() {

        console.log('calc vaccine efficacy');
        console.log('first dose efficacy ' + this.state.first_dose_efficacy);
        console.log('second dose efficacy ' + this.state.second_dose_efficacy);
        console.log('speed first dose ' + this.state.speed_first_dose);
        console.log('speed second dose ' + this.state.speed_second_dose);

        this.setState({
            vaccine_efficacy: ((this.state.first_dose_efficacy *
                this.state.speed_first_dose) + (this.state.second_dose_efficacy *
                    this.state.speed_second_dose)) / (this.state.speed_first_dose +
                        this.state.speed_second_dose
                )

        });


        this.setState({
            velocidade_vacinacao:(this.state.speed_first_dose +
                        this.state.speed_second_dose
                )

        });


        this.resetIframe();

        console.log(this.state.vaccine_efficacy
        );

    }

    handleChange = (event, newValue) => {

       this.calc_vaccine_efficacy()
    };

    handleChange_first_dose_efficacy = (event, newValue) => {
        this.setState({ first_dose_efficacy: newValue });

        this.calc_vaccine_efficacy()
    };


    handleChange_first_dose_efficacy_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ first_dose_efficacy: event.target.value });

        this.calc_vaccine_efficacy()
        
    };


    handleChange_second_dose_efficacy = (event, newValue) => {
        this.setState({ second_dose_efficacy: newValue });

        this.calc_vaccine_efficacy()
    };


    handleChange_second_dose_efficacy_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ second_dose_efficacy: event.target.value });

        this.calc_vaccine_efficacy()

    };

    handleChange_speed_first_dose = (event, newValue) => {
        this.setState({ speed_first_dose: newValue });

        this.calc_vaccine_efficacy()
    };

    handleChange_first_dose_speed_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ speed_first_dose: event.target.value });

        this.calc_vaccine_efficacy()

    };



    handleChange_speed_second_dose = (event, newValue) => {
        this.setState({ speed_second_dose: newValue });

        this.calc_vaccine_efficacy()
    };


    handleChange_second_dose_speed_text_input = (event: React.ChangeEvent<HTMLInputElement>) => {

        this.setState({ speed_second_dose: event.target.value });

        this.calc_vaccine_efficacy()

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
                        Percentual de Pessoas com a vacina Aztrazência:
                   <Slider
                            
                            orientation="horizontal"
                            defaultValue={0.5}
                            step={0.05}
                            min={0}
                            max={1}
                            valueLabelDisplay="auto"
                            aria-labelledby="vertical-slider"
                            onChange={this.handleChange}
                        />
                    </label><br />
           

                 <label>
                        Eficácia da Vacina (primeira dose):
                        <TextField value={this.state.first_dose_efficacy}
                            onChange={this.handleChange_first_dose_efficacy_text_input} />
                <Slider

                    value={this.state.first_dose_efficacy}
                    orientation="horizontal"
                    defaultValue={0.5}
                    step={0.05}
                    min={0}
                    max={1}
                    valueLabelDisplay="auto"
                    aria-labelledby="vertical-slider"
                            marks={marks}
                            onChange={this.handleChange_first_dose_efficacy}
                    />
                    </label><br />

                    <label>
                        Eficácia da Vacina (segunda dose):
                        <TextField value={this.state.second_dose_efficacy}
                            onChange={this.handleChange_second_dose_efficacy_text_input} />
                    <Slider
                        value={this.state.second_dose_efficacy}
                        orientation="horizontal"
                        defaultValue={0.5}
                        step={0.05}
                        min={0}
                        max={1}
                        valueLabelDisplay="auto"
                        aria-labelledby="vertical-slider"
                            marks={marks}
                            onChange={this.handleChange_second_dose_efficacy}
                    />
                    </label><br />

                    <label>
                        Velocidade de  Vacinação (primeira dose) (K pessoas por dia):
                         <TextField value={this.state.speed_first_dose}
                            onChange={this.handleChange_first_dose_speed_text_input} />
                        <Slider
                          
                            orientation="horizontal"
                            defaultValue={9000}
                            step={1}
                            min={0}
                            max={300000}
                            valueLabelDisplay="auto"
                            aria-labelledby="vertical-slider"
                            marks={marks_velocidade}
                            onChange={this.handleChange_speed_first_dose}
                        />
                    </label><br />


                    <label>
                        Velocidade de  Vacinação (segunda dose)(K pessoas por dia):
                        <TextField value={this.state.speed_second_dose}
                            onChange={this.handleChange_second_dose_speed_text_input} />
                        <Slider
                            value={this.state.speed_second_dose}
                            orientation="horizontal"
                            defaultValue={9000}
                            step={1}
                            min={0}
                            max={300000}
                            valueLabelDisplay="auto"
                            aria-labelledby="vertical-slider"
                            marks={marks_velocidade}
                            onChange={this.handleChange_speed_second_dose}
                        />
                    </label><br />


                    <label>
                        Eficacia ponderada da vacina :
                        <Slider
                            value={this.state.vaccine_efficacy}
                            orientation="horizontal"
                            defaultValue={0.5}
                            step={0.05}
                            min={0}
                            max={1}
                            valueLabelDisplay="auto"
                            marks={marks}
                            onChange={this.handleChange_velocidade}
                        />
                    </label><br />

                    <label>
                        Quantidade de novos infectados no modelo:
                        <Slider
                            id='quantidade_de_infectados'
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
