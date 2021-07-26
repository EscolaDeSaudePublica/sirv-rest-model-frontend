import * as React from "react";
import * as ReactDOM from "react-dom";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Image from 'material-ui-image'


const domain = process.env.REACT_APP_BASE_URL;


const marks_dias = [



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
        label: '90 dias',
    },


];

const marks_infectados = [



    {
        value: 0.001,
        label: 'novos infectados 0.1 % da população',
    },

    {
        value: 0.01,
        label: 'novos infectados 1 % da população',
    },

    {
        value: 0.02,
        label: 'novos infectados 2 % da população',
    },


];


const marks_velocidade = [



    {
        value: 0.001,
        label: '0.1 % da população por dia',
    },

    {
        value: 0.01,
        label: '1 % da população por dia',
    },

    {
        value: 0.02,
        label: '2% da população por dia',
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

    


    componentDidMount() {
        fetch(domain + "/" + this.state.vaccine_efficacy + "/" + this.state.velocidade_vacinacao + "/" + this.state.quantidade_infectados + "/" + this.state.dias_nova_infeccao+"/ 0 / ")
            .then(res => res.text())
            .then((data) => {
                console.log(data);
                this.setState({ figure: data });
            })
            .catch(console.log) 
    }

   


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
                    aria-labelledby="vertical-slider"
                    marks={marks}
                    onChange={this.handleChange}
                    />
                    </label><br />


                    <label>
                        Velocidade de  Vacinação:
                        <Slider
                            orientation="horizontal"
                            defaultValue={0.001}
                            step={0.001}
                            min={0}
                            max={0.020}
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
                            step={0.001}
                            min={0}
                            max={0.020}
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
                            step={10}
                            min={0}
                            max={90}
                            aria-labelledby="vertical-slider"
                            marks={marks_dias}
                            onChange={this.handleChange_dias_nova_infeccao}
                        />
                    </label><br />
                    <button onClick={() => { this.resetIframe(); }}>Simular</button><br />

                    <iframe key={this.state.random} src={domain + "/" + this.state.vaccine_efficacy + "/" + this.state.velocidade_vacinacao + "/" + this.state.quantidade_infectados + "/" + this.state.dias_nova_infeccao+"/ 0 / "} width="90%"
                        height="500px"></iframe>

                
                    
                </div>


            </React.Fragment >
        );
    }
}

ReactDOM.render(<FormSIRV />, document.getElementById("root"));
