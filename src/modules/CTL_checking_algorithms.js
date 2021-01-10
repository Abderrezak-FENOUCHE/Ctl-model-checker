//algorithme pour le 1 er cas : φ = p
export const caseOne = (structureKp, p) => {
    let etats = structureKp.S;
    let lib = structureKp.L;
    let etatInitial=structureKp.Q0;
    let marquage = [];

    lib.forEach(l => {
        l[1].forEach(propriete => {
            if (propriete == p) {
                marquage.push(l[0]);
            }
        });
    });

return marquage;

};

//algorithme pour le 2 eme cas : φ = ¬p
export const caseTwo=(structureKp, p)=>{
    let etats = structureKp.S;
    let lib = structureKp.L;
    let marquageP = [];
    let marquageNotP=[];

    marquageP=caseOne(structureKp, p);
    etats.forEach(etat => {
        if(!marquageP.includes(etat)){
            marquageNotP.push(etat);
        }
    });

return marquageNotP;
}

//algorithme pour le 3 eme cas: φ = ψ1 ∧ ψ2
export const caseThree=(structureKp,p1,p2)=>{
    let marquageP1 = [];
    let marquageP2= [];
    let marquage= [];
    marquageP1=caseOne(structureKp,p1);
    marquageP2=caseOne(structureKp,p2);

    marquageP1.forEach(etat=>{
        if(marquageP2.includes(etat)){
            marquage.push(etat);
        }
    });

return marquage;
}


//algorithme pour le 4 eme cas: φ = EXψ1

export const caseFor=(structureKp,p)=>{
    let marquageP= [];
    let marquage= [];
    marquageP=caseOne(structureKp,p);

    structureKp.R.forEach(r=>{
        if(marquageP.includes(r[1])){
            marquage.push(r[0]);
        }
    })
return marquage;
}

//algorithme pour le 5 eme cas: φ = E ψ1 U ψ2
export const caseFive=(structureKp,p1,p2)=>{
    let marquageP1=caseOne(structureKp,p1);
    let marquageP2=caseOne(structureKp,p2);
    let L=marquageP2;
    let marquage=[];
    let seenBefore=[];
    
    while (L.length>0) {
        let q=L[0];
        L=L.slice(1);
        marquage.push(q);
        
        structureKp.R.forEach(r=>{
            if(r[1]==q){
                if(!seenBefore.includes(r[0])){
                    seenBefore.push(r[0]);
                    if(marquageP1.includes(r[0])){
                        L.push(r[0]);
                    }
                }
            }
        })

    }
return marquage;
}

//algorithme pour le 6 eme cas: φ = A ψ1 U ψ2
export const caseSix=(structureKp,p1,p2)=>{
    let marquageP1=caseOne(structureKp,p1);
    let marquageP2=caseOne(structureKp,p2);
    let L=marquageP2;
    let nbTab=[];
    let marquage=[];
    
    structureKp.S.forEach(etat=>{
        let nb=0;
        structureKp.R.forEach(r=>{
            if(etat==r[0]){
                nb++;
            }
        })

        nbTab.push([etat,nb]);
    })

    while (L.length>0) {
        let q=L[0];
        L=L.slice(1);
        marquage.push(q);
      
        structureKp.R.forEach(r=>{
            let pNb;
            if(r[1]==q){
              nbTab.forEach(el=>{
                  if (el[0]==r[0]){
                      el[1]==el[1]-1;
                      pNb = el[1];
                  }
              })
              if(pNb==0 && marquageP1.includes(r[0]) && !marquageP1.includes(r[0])){
                L.push(r[0]);
              }
            }
           
        })

    }
return marquage;  

}
