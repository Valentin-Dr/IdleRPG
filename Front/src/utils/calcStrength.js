const calcStrength = (strength, comp) => {
  // check si le joueur a des compétences débloquées
  if (comp[0] !== null || comp[1] !== undefined) {
    const strUpg = comp.filter((upg) => upg.effect_stat === "force");
    if (strUpg.length > 0) {
      // variable qui va recevoir les données des compétences
      let newStr = strength;
      const rawStrUpgrades = strUpg.filter((elem) => elem.effect_type === "raw");
      const percentStrUpgrades = strUpg.filter((elem) => elem.effect_type === "percentage");
      if (rawStrUpgrades.length > 0) {
        rawStrUpgrades.forEach(elem => {
          newStr += (elem.effect * elem.level_competence);
        });
      };
      if (percentStrUpgrades.length > 0) {
        percentStrUpgrades.forEach(elem => {
          if (newStr > 0) {
            newStr *= (elem.effect + (elem.increment_effect * elem.level_competence));
          };
        });
      };
      return newStr;
    };
  } else {
    return strength;
  };
};

export default calcStrength;
