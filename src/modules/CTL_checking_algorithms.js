//algorithme pour le 1 er cas : φ = p
export const caseOne = (structureKp, p) => {
    let etats = structureKp.S;
    let lib = structureKp.L;
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