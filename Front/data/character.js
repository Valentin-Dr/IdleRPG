const characters = [
  {
    nom: 'The Counter',
    experience: 100,
    level: 1,
    points:50,
    inventory: {
      consommable : [
        {
          item_id:1,
          name:'poisson', 
          description:'pour manger. Apporte 5 points de vie', 
          img_path:'./images/vivre/poisson.png', 
          quantity: 8, 
          statistique: 5, 
          type_statistique: 'vie',
        },
        {
          item_id:2,
          name:'viande', 
          description:'pour manger. Apporte 5 points de vie', 
          img_path:'./images/vivre/viande.png', 
          quantity: 12, 
          statistique: 5, 
          type_statistique: 'vie',
        },
      ],
      equipment: [
        {
          name:'bottes', 
          description:' pour se chausser. Augmente la dexterité', 
          img_path:'./images/equipement/bottes/botte1.png',  
          quantity: 3, 
          type_statistique: 'dextérité', 
          reserve:[
            {
              item_id:1,
              name:'Bottes Lothbrok', 
              prix:150, 
              statistique: 30,
              description: 'pour se déplacer vite',
              img_path:'./images/equipement/bottes/botte1.png', 
            },
            {
              item_id:2,
              name:'bottes classes', 
              prix:150, 
              statistique: 5, 
              description: 'pour combattre avec élégance',
              img_path:'./images/equipement/bottes/botte2.png', 
            },
            {
              item_id:3,
              name:'bottes d\'hiver', 
              prix:150, 
              statistique: 10, 
              description: 'pour avoir chaud aux pieds',
              img_path:'./images/equipement/bottes/botte3.png', 
            }
          ]
        },
        {
          name:'casque', 
          description:' pour se protéger, Augmente l\'endurance', 
          quantity: 2, 
          type_statistique: 'endurance',  
          img_path:'./images/equipement/casque/casque.png', 
          reserve:[
            {
              item_id:1,
              name:'Casque spartiate', 
              prix:200, 
              statistique: 20, 
              description: 'casque pas mal',
              img_path:'./images/equipement/casque/casque2.png', 
            },
            {
              item_id:2,
              name:'casque solide', 
              prix:250, 
              statistique: 25, 
              description: 'casque résistant avec double amortisseur',
              img_path:'./images/equipement/casque/casque3.png', 
            }
          ]
        },
        {
          name:'armure',  
          description:'pour se protéger, Augmente l\'endurance', 
          quantity: 1, 
          type_statistique: 'endurance',  
          img_path:'./images/equipement/armure/armure1.png', 
          reserve:[
            {
              item_id:1,
              name:'Armure du viking ', 
              prix:400, 
              statistique: 40, 
              description: 'armure en titane',
              img_path:'./images/equipement/armure/armure1.png', 
            }
          ]
        },
        {
          name:'arme', 
          description:'pour se battre, Augmente la force', 
          quantity: 2, 
          type_statistique: 'force', 
          img_path:'./images/idleMenuIcons/combat.png', 
          reserve:[
            {
              item_id:1,
              type:'épée', 
              name:'Excalibur', 
              description:'pour trancher tous types d\'adversaire',
              statistique: 30, 
              img_path:'./images/equipement/armes/epee/epee.png', 
              degat_min:1,
              degat_max:2,
            }, 
            {
              item_id:2,
              type:'arbalette', 
              name: 'arbalette-po',
              description:'pour tirer des flêches',
              statistique: 15, 
              img_path:'./images/equipement/armes/arbalette/arbalette1.png',  
              degat_min:1,
              degat_max:2,
            }
          ]
        },
      ],
      ressources : [
        {
          item_id:1,
          name:'curare', 
          description:'pour faire préparer des médicaments chez l\'alchimiste',  
          img_path:'./images/ressources/plantes/curare.png', 
          quantity: 3,
        },
        {
          item_id:2,
          name:'fer', 
          description:'pour faire forger des équipements par le forgeron',  
          img_path:'./images/ressources/minerai/fer.png', 
          quantity: 6, 
        },
      ]
    },
    equipements : {
      //name, type(arme), description, statistique, image
      casque: 1, 
      armure: 1, 
      bottes: 1,
      arme : 1,
    },
    vie: 50,
    force: 10, 
    endurance: 15, 
    dextérité: 5,
    gold: 0,
  },
];

export default characters;
