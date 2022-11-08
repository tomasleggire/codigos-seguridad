import React from "react";

const SECURITY_CODE = 'paradigma';

function UseState({name}) {

    const [state, setState] = React.useState({
      value: '',
      error: false,
      loading: false,
      deleted: false,
      confirmed: false,
    })

    const onConfirm = () => {
      setState({
        ...state,
        error: false,
        loading: false,
        confirmed: true,
      });
    };

    const onError = () => {
      setState({
        ...state,
        error: true,
        loading: false,
      });
    };

    const onWrite = (newValue) => {
      setState({
        ...state,
        value: newValue,
      });
    };

    const onCheck = () => {
      setState({
        ...state,
        loading: true,
      });
    };

    const onDelete = () => {
      setState({
        ...state,
        deleted: true,
      });
    };

    const onReset = () => {
      setState({
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
      });
    };


    React.useEffect(() => {
        console.log('Empezando el efecto');
        if (state.loading) {
            setTimeout(() => {
                console.log('Haciendo la validacion');
                if (state.value === SECURITY_CODE) {
                  onConfirm();
                } else {
                  onError();
                }
                console.log('Terminando la validacion');
            }, 3000);
        }
        console.log('Terminando el efecto');
    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
      return (
        <div>
          <h2>Eliminar {name}</h2>
          <p>Por favor, escribe el código de seguridad.</p>

          {(state.error && !state.loading) && (
            <p>Error: el código es incorrecto</p>
          )}

          {state.loading && (
            <p>Cargando...</p>
          )}

          <input 
            placeholder="Código de seguridad"
            value={state.value}
            onChange={(e) => {
              onWrite(e.target.value);
            }}
          />
          <button
            onClick={() => {
              onCheck();
            }}
          >Comprobar</button>
        </div> 
    )} else if (state.confirmed && !state.deleted) {
      return (
        <>
          <p>Estado de confirmacion</p>
          <button
            onClick={() => {
              onDelete();
            }}
          >Sí, eliminar</button>
          <button
            onClick={() => {
              onReset();
            }}
          >No, mantener</button>
        </>
      )
    } else {
      return (
        <>
          <p>Eliminado con exito</p>
          <button
            onClick={() => {
              onReset();
            }}
          >Reestablecer</button>
        </>
      )
    }
}

export {UseState};