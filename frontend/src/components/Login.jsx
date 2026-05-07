const handleLogin = async (e) => {
  e.preventDefault();
  setError(''); // Resetăm erorile vechi

  try {
    // Înlocuiește adresa de mai jos cu cea pe care ți-o dă colegul!
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,       // Trebuie să se pupe cu ce vrea el (ex: username)
        password: password
      }),
    });

    const data = await response.json();

    if (response.ok) {
      // ✅ SUCCES: Salvăm "cheia" de acces (token-ul) ca să nu te delogheze la refresh
      localStorage.setItem('token', data.token); 
      console.log('Te-ai logat cu succes!');
      
      // Te trimitem la Dashboard-ul tău nou-nouț
      navigate('/dashboard');
    } else {
      // ❌ EROARE de la backend (ex: parolă greșită)
      setError(data.message || 'Date incorecte. Mai încearcă!');
    }
  } catch (err) {
    // ⚠️ EROARE de conexiune (server oprit sau internet picat)
    setError('Nu mă pot conecta la server. E pornit backend-ul?');
  }
};