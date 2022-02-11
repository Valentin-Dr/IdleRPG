export default {
  menu: [
    {
      id: 1,
      nom: "Accueil",
      route: "/",
    }, 
    { 
      id: 2,
      nom: "Boutique", 
      route: "/shop",
    },
    { 
      id: 3,
      nom: "Inventaire/stat", 
      route: "/inventory",
    },
    { 
      id: 4,
      nom: "Combat", 
      route: "/fighting",
    },
    { 
      id: 5,
      nom: "Craft", 
      route: "/craft",
    },
    { 
      id: 6,
      nom: "Minage", 
      route: "/jobs/:nom",
    },
    { 
      id: 7,
      nom: "Pêche", 
      route: "/jobs/:nom",
    },
    {
      id: 8,
      nom: "Contact",
      route: "/contact"
    }
  ],
  utilisateur:
  [
    {
      id: 1,
      email: "babouche@gmail.com",
      password: "cheval",
    },
    {
      id: 2,
      email: "canard@gmail.com",
      password: "dofus",
    }
  ],

  personnages: 
  [
    {
      id: 10,
      nom: "Graou",
      pieces: 100,
      niveau: 2,
      utilisateur_id: 1,
    },
    {
      id: 12,
      nom: "Ushurus",
      pieces: 53,
      niveau: 1,
      utilsateur_id: 2,
    }
  ],

  caracteristiques:
  [
    {
      id:1,
      nom: "force",
      description:"augmente les dégâts infligés",
    },
    {
      id: 2,
      nom: "endurance",
      description:"augmente les points de vie et la défense",
    },
    {
      id: 3,
      nom: "dexterite",
      description:"augmente la vitesse d'attaque, chance d'esquive et coup critique",
    },
  ],
  equipement_emplacement:
  [
    {
      id: 1,
      nom: "arme" 
    },
    {
      id: 2,
      nom: "tête"
    },
    {
      id: 3,
      nom: "armure"
    },
    {
      id: 4,
      nom: "bottes"
    }
  ],
  objet_type:
  [
    {
      id: 1,
      nom: "minerai" ,
      description: " pour crafter des équiepements "
    },
    {
      id: 2,
      nom: "poisson" ,
      description: " pour récupérer sa vie "
    },
    {
      id: 3,
      nom: "armure" ,
      description: "pour augmenter son endurance"
    },
    {
      id: 4,
      nom: "casque" ,
      description: "pour augmenter son endurance" 
    },
    {
      id: 5,
      nom: "bottes" ,
      description: "pour augmenter sa dextérité" 
    },
    {
      id: 6,
      nom: "arme" ,
      description: "pour augmenter sa force"
    },
  ],
  objet_caracteristique:
  [
    {
      id: 1,
      valeur: 10,
      caracteristique_id:1
    },
    {
      id: 2,
      valeur: 8,
      caracteristique_id:2
    },
    {
      id: 3,
      valeur: 20,
      caracteristique_id:3
    },
    {
      id: 4,
      valeur: 45,
      caracteristique_id:1
    },
    {
      id: 5,
      valeur: 2,
      caracteristique_id:2
    },
    {
      id: 6,
      valeur: 5,
      caracteristique_id:3
    },
    {
      id: 7,
      valeur: 8,
      caracteristique_id:1
    },
    {
      id: 8,
      valeur: 30,
      caracteristique_id:2
    },
    {
      id: 9,
      valeur: 15,
      caracteristique_id:3
    }
  ],
  objet:[
    {
      id: 1,
      nom: "épée",
      objet_type_id: 6,
      objet_caractéristiques_id: 2,
      métier_id: "",
    },
    {
      id: 2,
      nom: "cottes de mailles",
      objet_type_id: 3,
      objet_caractéristiques_id: 1,
      métier_id: "",
    },
    {
      id: 3,
      nom: "arc",
      objet_type_id: 6,
      objet_caractéristiques_id: 8,
      métier_id: "",
    },
    {
      id: 4,
      nom: "truite",
      objet_type_id: 2,
      objet_caractéristiques_id: 7,
      métier_id: 2,
    },
    {
      id: 5,
      nom: "carpe",
      objet_type_id: 2,
      objet_caractéristiques_id: 5,
      métier_id: 2,
    },
    {
      id: 6,
      nom: "heaume de garde forestier",
      objet_type_id: 4,
      objet_caractéristiques_id: 3,
      métier_id: "",
    },
    {
      id: 7,
      nom: "chaussures trouées",
      objet_type_id: 5,
      objet_caractéristiques_id: 4,
      métier_id:"",
    },
    {
      id: 8,
      nom: "fer",
      objet_type_id: 1,
      objet_caractéristiques_id: 6,
      métier_id: 1,
    },
    {
      id: 9,
      nom: "cuivre",
      objet_type_id: 1,
      objet_caractéristiques_id: 9,
      métier_id: 1,
    },
    {
      id: 10,
      nom: "armure de chevalier",
      objet_type_id: 3,
      objet_caractéristiques_id: 5,
      métier_id:"",
    },
  ],
  metier: [
    {
      id: 1,
      nom:"mineur",
      description:"permet de récupérer des minerais pour le craft",
    },
    {
      id: 2,
      nom:"pécheur",
      description:"permet d'attraper des poissons pour se soigner",
    }
  ],
  metier_personnage:
  [
    {
      id: 1,
      niveau: 1,
      personnage_id:1,
      metier_id: 1,
    },
    {
      id: 2,
      niveau: 4,
      personnage_id:1,
      metier_id: 2,
    },
    {
      id: 3,
      niveau: 2,
      personnage_id:2,
      metier_id: 1,
    },
    {
      id: 4,
      niveau: 3,
      personnage_id:2,
      metier_id: 2,
    },
  ],
  //à compléter avec l'inventaire
  /*equipement_personnage: [
    {
      id: 1,
      nom_emplacement: "",
      personnage_id: ,
      equipement_emplacement_id: ,
      inventaire_id: ,

    }
  ]*/
  caracteristique_personnage: [
    {
      id: 1,
      valeur: 10,
      personange_id: 1,
      caracteristique_id: 1,
    },
    {
      id: 2,
      valeur: 8,
      personange_id: 1,
      caracteristique_id: 2,
    },
    {
      id: 3,
      valeur: 7,
      personange_id: 1,
      caracteristique_id: 3,
    },
    {
      id: 4,
      valeur: 5,
      personange_id: 2,
      caracteristique_id: 1,
    },
    {
      id: 5,
      valeur: 15,
      personange_id: 2,
      caracteristique_id: 2,
    },
    {
      id: 6,
      valeur: 8,
      personange_id: 2,
      caracteristique_id: 3,
    }
  ],
  //à compléter plus tard
  /*inventaire: [ 
    {
      id: 1,
      num_emplacement: 1,
      personnage_id: 1,
      objet_id: 1,
    }
  ]*/
  monstre: [
    {
      id: 1,
      nom: "blob",
      niveau: 2,
    },
    {
      id: 2,
      nom: "gobelin",
      niveau: 10,
    },
    {
      id: 3,
      nom: "golem",
      niveau: 25,
    },
  ],
  caracteritique_monstre: [
    {
      id: 1,
      valeur: 5,
      monstre_id: 1,
      caracteristique_id: 1,
    },
    {
      id: 2,
      valeur: 8,
      monstre_id: 1,
      caracteristique_id: 2,
    },
    {
      id: 3,
      valeur: 2,
      monstre_id: 1,
      caracteristique_id: 3,
    },
    {
      id: 4,
      valeur: 10,
      monstre_id: 2,
      caracteristique_id: 1,
    },
    {
      id: 5,
      valeur: 15,
      monstre_id: 2,
      caracteristique_id: 2,
    },
    {
      id: 6,
      valeur: 15,
      monstre_id: 2,
      caracteristique_id: 3,
    },
    {
      id: 7,
      valeur: 25,
      monstre_id: 3,
      caracteristique_id: 1,
    },
    {
      id: 8,
      valeur: 40,
      monstre_id: 3,
      caracteristique_id: 2,
    },
    {
      id: 9,
      valeur: 50,
      monstre_id: 3,
      caracteristique_id: 3,
    },
  ],
  recompense: [
    {
      id: 1,
      points_xp: 10,
      pieces: 5,
    },
    {
      id: 2,
      points_xp: 15,
      pieces: 6,
    },
    {
      id: 3,
      points_xp: 20,
      pieces: 15,
    },
    {
      id: 4,
      points_xp: 40,
      pieces: 25,
    },
    {
      id: 5,
      points_xp: 20,
      pieces: 20,
    },
    {
      id: 6,
      points_xp: 40,
      pieces: 8,
    },
    {
      id: 7,
      points_xp: 25,
      pieces: 2,
    },
    {
      id: 8,
      points_xp: 120,
      pieces: 50,
    },
    {
      id: 9,
      points_xp: 45,
      pieces: 25,
    },
    {
      id: 10,
      points_xp: 24,
      pieces: 15,
    },
  ],
  monstre_recompense: [
    {
      monstre_id:1,
      recompense_id:1,
      monstre_recompense_id:10,
    },
    {
      monstre_id:1,
      recompense_id:2,
      monstre_recompense_id:11,
    },
    {
      monstre_id:2,
      recompense_id:3,
      monstre_recompense_id:12,
    },
    {
      monstre_id:2,
      recompense_id:4,
      monstre_recompense_id:13,
    },
    {
      monstre_id:3,
      recompense_id:5,
      monstre_recompense_id:14,
    },
    {
      monstre_id:3,
      recompense_id:6,
      monstre_recompense_id:15,
    }
  ],
  recompense_objet: [
    {
      id: 1,
      chance_obtention:0.10,
      recompense_id: 3,
      objet_id: 1,
    },
    {
      id: 2,
      chance_obtention:0.70,
      recompense_id: 2,
      objet_id: 1,
    },
    {
      id: 3,
      chance_obtention:0.80,
      recompense_id: 6,
      objet_id: 1,
    },
    {
      id: 4,
      chance_obtention:0.25,
      recompense_id: 5,
      objet_id: 4,
    },
    {
      id: 5,
      chance_obtention:0.74,
      recompense_id: 6,
      objet_id: 2,
    },
    {
      id: 6,
      chance_obtention:0.20,
      recompense_id: 8,
      objet_id: 10,
    },
    {
      id: 7,
      chance_obtention:0.32,
      recompense_id: 9,
      objet_id: 8,
    },
    {
      id: 8,
      chance_obtention:0.65,
      recompense_id: 10,
      objet_id: 4,
    },
    {
      id: 9,
      chance_obtention:0.12,
      recompense_id: 5,
      objet_id: 5,
    },
  ],
}
  

  
