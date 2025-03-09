import './LogoStyle.css'
import { useNavigate } from 'react-router-dom';

export default function Logo() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/login');
    }
    return (
        <>
            <div className='logo'>
                <div>
                    <img className='imgLogo' src="/white_on_trans.png" alt="Логотип" />
                    <div>
                        <h1 className='h1Logo'>Добро пожаловать в нашу звёздную галактику общения!</h1>
                        <p className='pLogo' style={{ textAlign: 'center' }}>
                            Присоединяйтесь к мессенджеру, где ваши сообщения сияют, как звёзды.
                        </p>
                    </div>
                </div>
                <button className='logoButton' onClick={handleClick}>Начать общение</button>
            </div>
        </>
    );
}