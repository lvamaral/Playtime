import * as firebase from 'firebase';
db = firebase.database();
ref = db.ref('/parks');


const addMapsToDB = () => {
  for(let i = 0; i < 1; i++){
    firebase.database().ref("")
  }
}

res = [
      {
       "formatted_address" : "Bryant St & Beale St, San Francisco, CA 94105, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7862337,
             "lng" : -122.3900761
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.78751768029149,
                "lng" : -122.3886531697085
             },
             "southwest" : {
                "lat" : 37.78481971970849,
                "lng" : -122.3913511302915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "052d7956ddc22c7dddfcbd0725c921eec46635da",
       "name" : "Rincon Hill Dog Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 1541,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/111085852685867296039/photos\"\u003eAndrea Longinotti\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAP8-EiVpqlGgtSjID5VMYssWXu0lltvc6oL6-9tsiWi0PkoKPR_JOlHSAnleJhMZ0xH_kNhcMApJqM4JGKrqhVAfsQZQKSexiKt6N_rqmBPJqINgNAg87shBcaoBTLcTsEhCq5TasjU_YHrnzBYVX-xYcGhTe5wMsvE9xFHiDt3ApRpCbf6X8EA",
             "width" : 2048
          }
       ],
       "place_id" : "ChIJNXceAXqAhYARVkO4Q2orXd0",
       "rating" : 4.2,
       "reference" : "CmRSAAAA7WuOzbkkIuKTw_szRa-qPqLhwH7iae5POpqYZft2obrusQ6jYEk8VuDH4kOgkEgcur0uwMcE-GBE_sWSIqs0MPOctiKJOVVRIZL5H0mG1MEIyJ0E9gabcRrS0l9gi_vJEhA8UrxnLUdX_zDHO08tRomHGhR-LmkrDwXKtccyyYEFmEKx4rmWkw",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "Duboce St & Scott St, San Francisco, CA 94114, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.769589,
             "lng" : -122.4328636
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.77093798029149,
                "lng" : -122.4315146197085
             },
             "southwest" : {
                "lat" : 37.76824001970849,
                "lng" : -122.4342125802915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "ec48101dfb419c0eedd0b2732ba00f1e62ca51ec",
       "name" : "Duboce Park Dog Play Area",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 2988,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/106498049376298028235/photos\"\u003eTaryn Hartley\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAADtmIWappk1XdnYRPiiNrk6NtGDTLb4_xkXaW0ExrD9KrtRAXrn_xFpEp-HkffxFW1MHVVwn7GrNo0KOOkb89e53iZYd8dleswnZN7wTcPBC2NHS-ez1fFQ2ZqFdesK12EhASsKyxx0l2-5lJBlKL9FZPGhTGPRB_-wBcN8jXaMhGWl3jeyzpCQ",
             "width" : 5312
          }
       ],
       "place_id" : "ChIJwXCwC6eAhYARQoWxmx9XoRk",
       "rating" : 4.5,
       "reference" : "CmRRAAAA4cVboXONHSYOYkFynrrCIkI4WDq-5TiVcoOxTEXEhDnq-2Jw0cDzNqHI0ubFVIWShFv1QtC4U56F6RKoMPOiqeUeo2iUuETjmpUU6Gq42r6ZQxql4lxvwf99e3X0WhzSEhAgdZ7xdzu3agOUdusJE5W0GhR9wOd74YqYDJZnpu2UMulJdAKWJA",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "6335 Fulton St, San Francisco, CA 94121, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7710219,
             "lng" : -122.4988491
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.77281258029149,
                "lng" : -122.4975313197085
             },
             "southwest" : {
                "lat" : 37.77011461970849,
                "lng" : -122.5002292802915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "2ade1c2967779eb07be86b1d9070ce33e9b9f405",
       "name" : "Golden Gate Park Dog Training Area",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 3024,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/112209834361073108383/photos\"\u003eAlex N.\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAArqKNlfPBC93jVY7ArozCfhI5oi-vb3kO9AiVv1GTHqBOkGNJDJO3fAcSjzZ-gVHTKGwFl61Gk0O_szSSefzToxjtG4JG-50S_koxFK_zfpuBaZGthN_CnT50f2TZ2gzUEhA4OpQAMqoRWcpRmcIt1hdKGhSvUIgRT3BJkRzT3tNt_tVXnyYedw",
             "width" : 4032
          }
       ],
       "place_id" : "ChIJZa6z86OHhYARdZs451KURS0",
       "rating" : 4,
       "reference" : "CmRRAAAAEgy8ylS92hKNrnukfgVB_CBAA35pmmpBVsqrm7WPE_FCDbar4hOYnWrq2VpuxA4-xswqZecE0DgxCtpGjz52dDPV3GDMrNiJNff_6D8_UhwEO2sZ8rgKa2AsALE3FuuYEhB2cW0tvgPl0y4z0jwo-XISGhT7KRvyIF8kAGFBAWri4KW764REVA",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "800-898 27th St, San Francisco, CA 94131, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7463602,
             "lng" : -122.4385926
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7476490802915,
                "lng" : -122.4372380697085
             },
             "southwest" : {
                "lat" : 37.7449511197085,
                "lng" : -122.4399360302915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "004ebb3bb0cecfc98e6e15a0cf1a35ca353c22b1",
       "name" : "Douglass Dog Park",
       "photos" : [
          {
             "height" : 8888,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/107730655923213512159/photos\"\u003eEric Mayers\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAACPKny9VDieP5LCnsTile5CPys8QIPEDDjFisGunx_RW5GxXdo3yHbRmS_ylhQ2Fid7UBqnerq-t7l26zb4J6LQxdeBRikU-FjXZiOi3y8o5J3QiTCQ-CGKcSLzgaO6h9EhBbkp-f9m4x9kHRtCbUZqlCGhRJvRXzTD_pzxtftUH7o96_NL21TQ",
             "width" : 4660
          }
       ],
       "place_id" : "ChIJ53coJHN-j4ARIX3hoaKeun0",
       "rating" : 4.6,
       "reference" : "CmRRAAAATSVEGkajXHvfU9NwYKQ7AJNUDBMVc_dx8XbIIZS_X9ghjdKVvnoSMVMJiKvhnJ66FRrYErye1QbsIl4N7R3zPM2b9FRN7DdPndWOGAlYKP5KfYsaeB8tsOBvqdYZswU9EhDwrzU43A9RGFLbpvfN_RSwGhTNJnzyYj98Ylim5lbFut1kK00nTQ",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "451 Berry St, San Francisco, CA 94158, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7710726,
             "lng" : -122.3985632
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7725747802915,
                "lng" : -122.3974059197085
             },
             "southwest" : {
                "lat" : 37.7698768197085,
                "lng" : -122.4001038802915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "1d8819f20d842bcdec2185a9f5d6fdda43db8874",
       "name" : "Mission Bay Dog Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 2988,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/111310493715154839062/photos\"\u003eLori Washbon\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAdcrOnOJJA19YcM5t6FPpkG5ZwhMWaKdfQhznof_Wb13pN9V7uKI5y6ViKIKYK7yMXCnl3R2Z2egDgX0qM4d84Sef6odTZBhF6mumhgH8laZPLwhqI9rE7bF6MYOwsUdxEhCpky3MSIyxn56slGgS_C0sGhQz-0_aQcgI4QQMRR9c9ydVdODtag",
             "width" : 5312
          }
       ],
       "place_id" : "ChIJ46nz-tJ_j4ARoc-hwA2wr4k",
       "rating" : 4.3,
       "reference" : "CmRSAAAAsaBpAmOQfrDs25aLBsFgl8ZMdyq7Uj_LFsOui0voCMY5HDeLx_pY7Cg6v-Oej7ynl3qbk0uqn67-mQQrhAIFRJZXk5iAMSI1scFLaQDrTgd-dJ17NVEkUzb9-qliZIV_EhCnAMjukjP7jb1xiEqNHtT1GhTc-3eHhx4aEYX_6uSoZdwWLe48lQ",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "100 Vale Ave, San Francisco, CA 94132, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.736504,
             "lng" : -122.4832379
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.73772788029149,
                "lng" : -122.4816928197085
             },
             "southwest" : {
                "lat" : 37.7350299197085,
                "lng" : -122.4843907802915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "ae8b4f560003ada20edb9088d7be048a5f3b8ecb",
       "name" : "Stern Grove Dog Park",
       "photos" : [
          {
             "height" : 2268,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/112080652856327637617/photos\"\u003eNakita Strangeways\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAACLj6prQeowu1lqIJiOxvANnpnOoDOr24n0GinOQ_p58SK8gqi8WqwmxUvUO-C0GNr5djjWmCqAbZ-ZJ0cPAUWBkS727H0CQCmmop60yNfP2xnN3uuwSj5caNaupVWqDTEhDyhL1h9jecOSI7i86AzT_pGhRqlonvN-OjPIyfg2fk8OZ1mIylSw",
             "width" : 4032
          }
       ],
       "place_id" : "ChIJ6cpmppl9j4ARDpJW1T7RZ7s",
       "rating" : 4.8,
       "reference" : "CmRSAAAAkqYPwIoUOKIWnWBo51k-1Zpb4iuVn_MU9Lyeg1qf6Afl8zo5Hrxu-7K72Aiugr96qYd4sI3LYo3bFo0_Ck5mB8ZlGvn8gUzBik_yc9OMUjd9GkuVQaNjXhnoGiRLUhEWEhBn7_ZTd1eAJSDS8MWTUCgYGhQGUnT9yPdXGbF4h3AFQqf5UqpxKw",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "Sloat Blvd & Vale Ave, San Francisco, CA 94132, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7360693,
             "lng" : -122.4842268
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.73743148029149,
                "lng" : -122.4828889197085
             },
             "southwest" : {
                "lat" : 37.73473351970849,
                "lng" : -122.4855868802915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "adebfa0d3ea267550da3a6725f3fd424ffc59c85",
       "name" : "Pine Lake Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 1836,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/113801792944198209187/photos\"\u003eKEVIN KREIß\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAOWvqH7K68MJC0jBNd7NBNvYH6YjApjperMDazstLge72ADEMvLT9HiwZgOO7ldSKeigKbDSxYTbTUGaUNYOVvxvS5VyMeIKZJgo06OfLJKq66PUiDKWGW_lXwNMHTGKvEhD0G14t1skcCf-6AsECHXOOGhRVWBDDYUf8ptB27cBNRwDwjGgwMQ",
             "width" : 3264
          }
       ],
       "place_id" : "ChIJi2MtTZl9j4AR81fZkNsVP98",
       "rating" : 4.4,
       "reference" : "CmRSAAAAZcLVPLW78_JYN4LTEgyucEvrMvC6KlPlyW1xZya8eXT9Z0TMzfxwx6fyMBRp1sh2U0SLWdqvIwfdB6aqlluSBC4owb0JZW-eVq8fIPBvQcMsue5eSNJrala_vSURT8O4EhBUh0oQKCBOAZyiLcdltM1sGhRlbO9Q3F56rcK30Mm1HS6ElUIIOw",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "Fort Funston Rd, San Francisco, CA 94132, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7138804,
             "lng" : -122.4994575
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7151390802915,
                "lng" : -122.4976862697085
             },
             "southwest" : {
                "lat" : 37.7124411197085,
                "lng" : -122.5003842302915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "e8eb9b430b553afc37a69d870793d01c38f97a6a",
       "name" : "Fort Funston",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 2988,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/110734573957693194961/photos\"\u003eMike V\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAweat7vtKmjcrrxYGGpA7NdpnBgBTEUpxQtvuvuF3M6B3Ea9bSijZIuVU4uDd1V-2dTidZMfD1oruAls4khw_Ds3pPilz4uXrSn5ZAni7rG_C8PW_q5-ib32jmGr4s0WFEhD7HZJ4a_T9j8idEXoIKbivGhT5rWR-PEGSAxUeHG-RCX4t57d1BA",
             "width" : 5312
          }
       ],
       "place_id" : "ChIJazyNlAR9j4ARzE6pzUtJWyw",
       "rating" : 4.8,
       "reference" : "CmRRAAAA7Mt-DKq8be7w8cujSBs27-X1PpZbrAHA3ZG5ON4MgxVX2IB3jFUWZhAH0sTlV3xVPC9xAdUYzJ9KNXqysE3UwHIdyY9fL03Dfww9883E5qMvGlB6FUVoSfnoE6TaZBNJEhCkkDpCimpdSt6o5nLJsVqFGhRJfUUa3slrep-WChTYke6NqI_J5A",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "SSF Centennial Trail, South San Francisco, CA 94080, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.6540967,
             "lng" : -122.4306965
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.6554456802915,
                "lng" : -122.4293475197085
             },
             "southwest" : {
                "lat" : 37.65274771970851,
                "lng" : -122.4320454802915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "d8a6d56f8a5c08d4b81bb97553e2f38815a085f5",
       "name" : "Centennial Dog Park",
       "photos" : [
          {
             "height" : 2432,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/105676670269792434653/photos\"\u003eEddie Valadez\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAApscBPHmzwNCU07J5nMRhOEXD69zx7PLh-ZzC3hlpoZu17ax3F5cHnFxZabOPXBvacXFsx1dMqK65jh6fpIkJxRJ4UJaG8qGS3Pje7DZ1eTkSsmt9gdc3c5cN39SpBILLEhBHvwvgXoK1O1nroWOMMkaBGhRsVhc88oftUemWRaTGT1-4ERJcvQ",
             "width" : 4320
          }
       ],
       "place_id" : "ChIJV4up9p15j4ARBmynzOUmNLs",
       "rating" : 4.2,
       "reference" : "CmRSAAAA_aKluPuy8Fy_OqhIuihs8QQMc0LC1id7G9ZK-B9CNVMZjPDUCgRNDx8X83trTxRV5aSJwrunc6kW03fqyhxhrs-RLlUtzhkti6HdpBH85-PCnK1X91cOUvFsMDYNw6fxEhCKKx-ZDn2pPY7qo9W7dxICGhTIrwO31Wi4zU7djEQGc1Si4mSyFg",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "3550-3598 Alemany Blvd, San Francisco, CA 94132, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.711939,
             "lng" : -122.4651575
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.71322638029149,
                "lng" : -122.4638178697085
             },
             "southwest" : {
                "lat" : 37.7105284197085,
                "lng" : -122.4665158302915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "c003901c2792e5148f021525e6b0ff4c620c03b2",
       "name" : "Dog Park",
       "photos" : [
          {
             "height" : 3120,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/102660715414831770318/photos\"\u003eSugarSkull Baby\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAmgdZ8hQvsiouCJ07tgrbGLUdMoYt693mcO07hlFwCPNa2jra8P0vmUGow_zR2pa1TqGiOZVihRVJN6ewHn4KROCrTx_Tv4UfNJksDempQ__EOItEZyBPrRezW323jouwEhCajFsPLIeyJoxnomFhtz5xGhQQMKkMMdhBWJyQ_pcW1AwHH1nivg",
             "width" : 4160
          }
       ],
       "place_id" : "ChIJsf4iFjd8j4ARc7a6xdBSkrw",
       "rating" : 2.7,
       "reference" : "CmRSAAAAIOmJ718wHWINf5AU5FFBw4Y_VjHQgOKYmepELQfmrSnyZ54WVtfPLmisz_flTI1SO2dZdSc7iMY3OG-3w_wo-vFNMY0YCPQcqH2Mi8QTphI1vwXwh15wgAuAbGxkLuKJEhA2Z2NJvc3ZbjVXemHGDjK7GhSaRvlQwaiWxRA9o5_GMaBIdZxQeA",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "221 Justin Dr, San Francisco, CA 94112, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7332713,
             "lng" : -122.4210979
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7344547302915,
                "lng" : -122.4201188697085
             },
             "southwest" : {
                "lat" : 37.7317567697085,
                "lng" : -122.4228168302915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "9354833b9e8758878c17deda2d8663d337938609",
       "name" : "St. Mary's Dog Park",
       "place_id" : "ChIJrXmvgfV-j4AR4jnhPAiVpaI",
       "rating" : 3.7,
       "reference" : "CmRSAAAAHMxgCJ9Bty_PPNAtuahmCIrXtgWNS1egpIaJBnOqafHcD0I2wrI2cU1UECSfMBljxgLEVIRoImT1A60vSFCum0nE_gnp3hyf9PkEl7Pac9m4Zi9Li3TmdIKQhmHeb1H1EhCIcPWJTiNoUCYGD5UI1DFJGhSykLls18fmjbZQ70KYoxdOZOSF5g",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "Central Fwy, San Francisco, CA 94103, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7701897,
             "lng" : -122.4217574
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7715386802915,
                "lng" : -122.4204084197085
             },
             "southwest" : {
                "lat" : 37.7688407197085,
                "lng" : -122.4231063802915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "93ae93a8063dfdf36e2ef3181e4c09c027dbe86e",
       "name" : "SoMa West Dog Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 3036,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/108428122649718928396/photos\"\u003eColin Dunne\u003c/a\u003e"
             ],
             "photo_reference" : "CmRXAAAAAtS3zGiCzmQ5t6XtsO5-q_lpIxH4Lsmd9cyWifp6Gth-z-K5vTdlnsqf44oYJY1humbIjwkanJxSaHSwC2HBGYIxFzFMJ01CRfwVL5h1ZirOROQ8q3KRb8UHDEP1mid3EhBywcebRixxDN-npx29B2zCGhQh-N8ba03EUff3GQPU6vCVVuLEYw",
             "width" : 4048
          }
       ],
       "place_id" : "ChIJHbyLaCB-j4ARmerFoUdLCag",
       "rating" : 4.2,
       "reference" : "CmRSAAAAPG-in6f0FGyL-lJzg9sEbs1ohrKgssuOoGs-oUCJr8Rad-9Pl_6pMG8zd8vV198D8M3yGVW8Ze7oflTjxPMNylLIPGOpIssnUIU61ywZxm50qX19r8qTGMF_zuCluywhEhC8SFmg3K_85wmCrupNMmsCGhQqvPPXnwGeC0cAeijW1DviJECKPQ",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "Gough St & Washington St, San Francisco, CA 94109, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7916146,
             "lng" : -122.4276133
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7930768302915,
                "lng" : -122.4252205
             },
             "southwest" : {
                "lat" : 37.7903788697085,
                "lng" : -122.4284109
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "2430da79ed38e747218a7edd967fa4dec601e55b",
       "name" : "Lafayette Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 1840,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/118045908279662037661/photos\"\u003eTJ LU\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAArl7d4O5iQYzcbi_-FoxpwZjw6x2q0V5_vb-IQHt2t-gRxVYg4rMl92nQBLiUt6MtgehGFert2DwbMLcOTSZbRj6NpA-IhSIDlp95QMO1xKvsMaRHz2u0JFb7c1BwarcwEhBFDe4Nr5UgKaUg-CH19Z5UGhQeGnE3KV0OPW7HB322wJuU6kVrPw",
             "width" : 3264
          }
       ],
       "place_id" : "ChIJC3O0GsGAhYAR4JK4ut4xPsM",
       "rating" : 4.7,
       "reference" : "CmRSAAAASVHcjme02nBAX5RPETlqAndgz13NuV71iAAdSj5hbSi2SIOXcy2Ah3AmMwznYTUfzUlxVXfPBrfDloxl6hUvRg5hOt8qk_JenPsS_ed5vn5gQ_tiHMmsaHPf51OdRofLEhCjH-89-XvLN6xrRXGCS1tDGhSsMEm33JktrCaO5BsxVpbYLspqag",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "3200 Folsom St, San Francisco, CA 94110, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7470605,
             "lng" : -122.4122163
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7483814302915,
                "lng" : -122.4115385697085
             },
             "southwest" : {
                "lat" : 37.7456834697085,
                "lng" : -122.4142365302915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "f8cf5b560acf3259962e4b9dd128bd720ac0d087",
       "name" : "Precita Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 2988,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/109392814148673684722/photos\"\u003eCarol Grey\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAALJqjhKbJ03HfrbyBNCjtbeLOlE19snA8Enfi8WMngVh0Hy7SOFi0Zl86hta45Fbb3_ZF4yzVg4UAXnyweXroyq4jBjIp3rQp0P_bp4_0t0gjxiFl5iHHnOqG6BIOTI1REhDB9JzXqPmuU5_PPWBBvTr_GhSmeV7aeqyUhUwbcpmMsjilb0ivkg",
             "width" : 5312
          }
       ],
       "place_id" : "ChIJh6mckk9-j4ARNgSUccMhbjk",
       "rating" : 4.6,
       "reference" : "CmRRAAAAnhl7jUScBNCP1jo_89ejAHt8Ng11NuUjtahO6KaZPQqiJMcyS8FuIJzkcQL7ME2yx6d1OtbHE1o8MVs_iZmI_c1JYIK7LTeS1Sqhx2s5FoFK9ANLJSGj_wlmEPa8YgrHEhD6paUCgTG66yIXufdBgSeOGhSUMenxepnqOtq_3z-hucjvQpsGRA",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "Roosevelt Way & Museum Way, San Francisco, CA 94114, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7653122,
             "lng" : -122.4385846
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7671074802915,
                "lng" : -122.4370518697085
             },
             "southwest" : {
                "lat" : 37.7644095197085,
                "lng" : -122.4397498302915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "3af852d3fb71ce0a460be7e5842bc9bc4e3b9efb",
       "name" : "Corona Heights Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 3199,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/116676836449714411431/photos\"\u003eDebojyoti Ghosh\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAfn0WmdoB6IfLB0U18vUhec6Wt1IPXxrCgZ-mO-OnUK-gP2gOsRKj1SrcQWFuUVEX7I3omoWd1kexAhvf0cmIiccSutnCIOLxJCXVsvhyL4F32fZYLpqrg50k6PeE4lVJEhBWtf4dy0UsOiqmYUUWNOOKGhR4P2mE1y5gFoTEQNZ-Uu0-fKGqeg",
             "width" : 5001
          }
       ],
       "place_id" : "ChIJX3DWQgJ-j4ARxWqSTDOy_CU",
       "rating" : 4.7,
       "reference" : "CmRRAAAAWKQB2SNHPRn2Ik2Rxxc1WX35i6qX2Wjc8HMi3LKljCiC03QME8YVuOfsr86P7q0qwh0WNysVtythTFPta4m7D_b-4qBUqlRkPRUxCKQQkA6W2Nxy-w3sY5PwSAQYD7IBEhAr92jE_CD8T8bnoXpZz9ALGhSNurKhJlr0cfYR1rtONmzNU0MW4g",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "100 John F Shelley Dr, San Francisco, CA 94134, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.719309,
             "lng" : -122.4193742
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7206862802915,
                "lng" : -122.4180224697085
             },
             "southwest" : {
                "lat" : 37.7179883197085,
                "lng" : -122.4207204302915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "ce0d34b4c27acbab3d6608ace987c8b031dc21e7",
       "name" : "John McLaren Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 2988,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/110312719849122729064/photos\"\u003eMarco Rainaldi\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAtp3ilOy2hCPvssLtgews5Mu0PRHp62JKMdbs9ExPGeApEUnecCRkaqrTyD95pUUGqeccGXQvkA2d0qOnf1rT_ERcchTF1rR88WMs0bEpK9UWX3GzIRre8oaWIhlSEWVsEhC7WCS3QYJm-vmcMqNMfGBZGhRk6m7f-lFQtsLb5fkf6LySUoQORA",
             "width" : 5312
          }
       ],
       "place_id" : "ChIJ67-gn-5-j4ARcyjzTqE8ZdU",
       "rating" : 4.4,
       "reference" : "CmRSAAAA_VebdM27KaXJGyjlkdnD8jUTC-4SuADgsejVMu2u7VPm5tYeifoRAV-WKx9iud1MxsPJxPBF9Nxh-P_uBOi_4UWD4R3hOqqiTW4brFOirsyHxyi3AF21DQR3YGwT1trPEhDKv3QPt4ogE9d5CFFHoxj6GhTLjKgOp9oUzYkUtAxpjy_17dYClg",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "3400-3416 Folsom St, San Francisco, CA 94110, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7433416,
             "lng" : -122.4139903
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.74494783029149,
                "lng" : -122.4122632197085
             },
             "southwest" : {
                "lat" : 37.74224986970849,
                "lng" : -122.4149611802915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "dcfeba50cbcaf8edf059f05da0b6e2b5142ca10c",
       "name" : "Bernal Heights Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 3024,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/105163007391860774973/photos\"\u003eSean V\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAVkKtpJKhh6HJTKEmmzvUV79rChuCd8QWfctOXGPKsDheaztXHScqhXzjRwlTNcWZA0IZ1_-fwQrwKVimz6OwNJlwclHpSqF4BNtp2z0cN1cl7CXurAIRRF39YZas5VZQEhDb1XMOa1ILr4ngfQKt5N3SGhSkeBpPAJ56SkoHcnPgTyT-koqZrw",
             "width" : 4032
          }
       ],
       "place_id" : "ChIJVcl3jVp-j4ARlQaH_qXxBWA",
       "rating" : 4.7,
       "reference" : "CmRRAAAA0ciFhLKOG8uJmtqmuzeu8ZYYHZ_kJQUDdEiYq_dxcftD2FpzHue6chX3TlMr7UHOptCxiSxeAsYrZnWixaWZvuMNspnDrdUPnNXcwCj0krC7n2k71f4OysIkdIp7sUr5EhCPNhxprtCZNm_WupEWldXqGhSNUYXFgqdj3YYplB5PuJNajHUNEg",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "Elk St and Chenery St, San Francisco, CA 94127, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.74155880000001,
             "lng" : -122.4431851
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7429077802915,
                "lng" : -122.4418361197085
             },
             "southwest" : {
                "lat" : 37.7402098197085,
                "lng" : -122.4445340802915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "e2848d45811610341dda8a99fb48a1a6317e09ae",
       "name" : "Glen Canyon Park",
       "opening_hours" : {
          "open_now" : false,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 2448,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/106554700103544041941/photos\"\u003eNick Kinling\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAA5ZudIhc3JmXTatNqmbG1Nntp-NLVec3IBDP6baWgmIPHPtrxVZmv4KgNze6PCuIB1zuzTflWqGnTAYJs3vtZs4wG2CMytK9mEbwh_YIvgMi-DB1x1ICW6fawup9hvSVZEhAOIyN3Ehqze2H9g9x4z9xWGhQXrkTyhi259J1nvtOREdrk4shzWA",
             "width" : 3264
          }
       ],
       "place_id" : "ChIJ9SlCdnZ-j4AR86EzE6c9NY8",
       "rating" : 4.6,
       "reference" : "CmRSAAAAEzd8fpYlRyrm1_AnRYa6opoLIBpaWXhM9FUnVxOLWbigJIHCieZoLG4np1_3Vs4OuxmUwyir-oNwcHkcW6ltxTWJiph16RMG6QU6aQTFbHJA8sdgAmPx8My8OEo_fpm-EhCk5CES4_MXLVo38-kY8Q2gGhQ72ndlD8IVD_s05rsFXCjoCCWjmA",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "Indiana St, San Francisco, CA 94107, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7538695,
             "lng" : -122.3911078
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7552247802915,
                "lng" : -122.3896222697085
             },
             "southwest" : {
                "lat" : 37.7525268197085,
                "lng" : -122.3923202302915
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "48fa1d01ead165c80509a8831c681480ce19c485",
       "name" : "Progress Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 949,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/115497536118846992807/photos\"\u003eDaniel Pepper\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAf-8NwxGkbHyCbB3WnNNgCSxllch1G1sxYyJpSFgSNzvqgZaaJjZYQo1_x-4EbptwWAQj0ctszjRWYnURG9JXfNDSMHNNwYCeeAz0r_JkSfXnDvMddopDr5dQ6Z6YAhhgEhAf632KlM1jeItBEzwhatgHGhRU8Kd2anuoFe2CNcNoIanNhIA1yg",
             "width" : 1265
          }
       ],
       "place_id" : "ChIJiURQbLB_j4ARj5e6cvXElnw",
       "rating" : 4.5,
       "reference" : "CmRRAAAAWuo_NsO1GYMCYKCLCiO1C1QYwI9iQ4AProqwinxvlqn244qz_GyIMv6OIu2UF99CDxwlCWHU6xZrTR_yziPH4X27TXM3bUmQ-KB3qvl0jbmrC_qG_1cKYzkXAmf6HfudEhBp1Lxn_eEs5_5j0xrSM304GhTEFUFqAx0aPryjAlKYUZ6cieG0-g",
       "types" : [ "park", "point_of_interest", "establishment" ]
    },
    {
       "formatted_address" : "Gough St, San Francisco, CA 94102, United States",
       "geometry" : {
          "location" : {
             "lat" : 37.7817433,
             "lng" : -122.4256958
          },
          "viewport" : {
             "northeast" : {
                "lat" : 37.7832005302915,
                "lng" : -122.423189
             },
             "southwest" : {
                "lat" : 37.7805025697085,
                "lng" : -122.4265314
             }
          }
       },
       "icon" : "https://maps.gstatic.com/mapfiles/place_api/icons/generic_recreational-71.png",
       "id" : "b05c071cefd764d908247848b6e984b477a5c909",
       "name" : "Jefferson Square Park",
       "opening_hours" : {
          "open_now" : true,
          "weekday_text" : []
       },
       "photos" : [
          {
             "height" : 2988,
             "html_attributions" : [
                "\u003ca href=\"https://maps.google.com/maps/contrib/112600983412680911674/photos\"\u003eThanh Nguyễn Tuấn\u003c/a\u003e"
             ],
             "photo_reference" : "CmRYAAAAwXaSu3PY5SPYbBL3qOOjRFbJD8wr1vpQu9d_cg0uzwwTvDU2ZUOoijy8MVycfIBocp0WF54GP2dON-lGMy9G0s5vbwbRGkD6xhk0vkd4ufHqZuMuNj4s7FTIYJq5Z4FQEhAQn00hfal9KPo7GW5j9g8GGhRa0iu-DzBGXllQM4BCNkTTHAzTnw",
             "width" : 5312
          }
       ],
       "place_id" : "ChIJLa5_C72AhYAR7bHgmgQWrQo",
       "rating" : 4.1,
       "reference" : "CmRRAAAAhj7EsmAgAZpoWN1Fwru6fU9Qf31ygQStOJBrgGVvspC9R8UiEz_OeoPqTbOjpCz3g2x3YhzpGQyHJNlvWJioxuRxsOCh6U8dbjO8jDOTGltWmgps1kLuqJASHL8fbE6kEhD4Y47x-0NABUiEQzLdVbb_GhSs4Ekeum6iypa8WxFxinFdlJRd7g",
       "types" : [ "park", "point_of_interest", "establishment" ]
    }
  ]

addMapsToDB();
