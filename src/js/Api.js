export class Api {
  constructor(token_key, cohortId) { 
    this.token = token_key;
    this.cohortId = cohortId;
  }

  getCards(resourcePath, token) {
    return new Promise(function(resolve, reject) {

    fetch(resourcePath, {
      headers: {
        authorization: token
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        //если ошибка, переходим в catch
        reject(`Ошибка: ${res.status}`);
      })
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        console.log(err);
      });

    });
  }

  getUserInfo(resourcePath, token) {
    return new Promise(function(resolve, reject) {

    fetch(resourcePath, {
      headers: {
        authorization: token
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      //если ошибка, переходим в catch
      return reject(`Ошибка: ${res.status}`);
    })
    .then((result) => {
      resolve(result);
    })
    .catch((err) => {
      reject(err);
    });

    });  
  }

  postUserInfo(resourcePath, token, nameResearcher, aboutResearcher, avatarImgLink) {
 
    return new Promise(function(resolve, reject) {
    fetch(resourcePath, {
        method: 'PATCH',
        headers: {
          authorization: token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameResearcher,
          about: aboutResearcher,
          avatar: avatarImgLink
        })
      })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
         //если ошибка, переходим в catch
          reject(`Ошибка: ${res.status}`);
        })
        .then((result) => {
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}