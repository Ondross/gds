let plantDict = {
    tomato: {
        soilNeed : 5,
        waterNeed: 4,
        pollinatorScore: 6,
        difficulty: 5,
        pollinatorNeed: 5,
        growthSpeed: 5,
        urls: [
            "https://docs.google.com/drawings/d/e/2PACX-1vRVGjFT2cJ8x89pgLptYvStIjFRhdCNlFvl8F6NQzrMAyf7AY1hI3XVGzAWVadX8qm5yfw5LZuFLa_C/pub?w=697&h=678",
            "https://docs.google.com/drawings/d/e/2PACX-1vQLuWGr_lDrflm5X_HH-RP0LJPUhxNvg4We11uFxBY9dH86cKwXskIvGBsQujGpTZjrMEiZbiLIaQe4/pub?w=895&h=551",
            "https://docs.google.com/drawings/d/e/2PACX-1vQLuWGr_lDrflm5X_HH-RP0LJPUhxNvg4We11uFxBY9dH86cKwXskIvGBsQujGpTZjrMEiZbiLIaQe4/pub?w=895&h=551",
            "https://docs.google.com/drawings/d/e/2PACX-1vSdGWDliZMLq1RTdTN-k2hgnClsZHixOg_t6GcqDIxPJ-dcQSOYyMem7f8RJ1gV99CdkT0Y6NyqCJJ0/pub?w=733&h=698",
            "https://docs.google.com/drawings/d/e/2PACX-1vQ0gt6eV0MT0evZQbfCwes3kjjK95e1KShGk4CzOSO8gTP1KFTpJMAj8JxkzUPcXHaRWm16RHtU6HzT/pub?w=695&h=530",
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAADpCAMAAABx2AnXAAABwlBMVEX////kLCwREiTuOTIAAADybWja2tt/nVPpLS3jKyz0cWfnLS3rLS2CoVXuOjLuNi/ya2YAABtZAAD4+PgAABfr6+sXAAD0bmQAABMAABj09PRUAABdAAB1AADbKiolAACRAABnAAB6l0/xY14gAAB8AADPKChDAADDJiY3AABkZGS/v79OAACqICBuAABjAACTk5OIiIitra12dnbR0dEyPyE9TCdddD1th0grAAAkQCEbIxJLXTFXazmYHhx1FxdKDg4AHh6hAABmZ288SUk+UCpCQkKgoKB9FxcGGQATGA0oKChQYzLzeXQrNhw0RSPuT0k9AAnwV1KXHh4dNBo1KBdVdz5GRlIpKjhdXWd7e4JiZ185UQlKYiBZdS41RxU7RC8dHSRNUSw8LCpUQSNfRip1eW9fhUO2FRJRUVFCaTZ/MSBnLh45WSxXTSslNAAbGw90fWVrQCWMABX72dfzjotTRkdJHxT0nJj76ObuIRgIKRY1Rhg9QTgcMDARHgApHRQdHR5AKBtIWFeiYDl+i0tWNR9APSEFOhv3tLCyAAAbTCcAGAs3FxdJKyoqQEEoNiX3rqtPHwdiKSkmHiA1NULHWTBvAAAgAElEQVR4nO19iV8TWb4vIYekyjqVBDCRTrTEAEWFUJqVBLIixqRjSGiDYeltumfusLTM9L1oq8OM3a3vte2o07ffa//f+zunqpKqVAWwFcS5+fFBIUvlfOu3L+cwMNCnPvWpT33qU5/61Kc+9alPfepTn/rUpz71qU996lOfTowi3ve9ghOim/+uwNCHDWy01xNe5D/Ndbxr8iNHj2fC6FQX8s4pjMLWT8zcPN2FvHOKVGNWD/tR/LRX8q7p08+skIVR+dRX8o7JP/e5BbKZXiL6AVHis89NILyop1X5gKj8xZdtn5UIh8MJhz+KPnCjqFA8+Cn5zxubQZdnr1y6dHUeVV/GPmwHTcn/h2B8IHwDjWwLGDMMg5ulxp0roacfvpqFP09/hWQBc5wNiGO/ztQK2CaM/9HSFZxNCkfD5lgpjIK7EraphPMt1JIZG8fg6/MfDjRHZGambDR5MbT/J/4ZqwFj/1Kq1wQFIzd+M/GeFvo7yB+7eavcsQ1xn4ilXWdBZRkDDMv9R5t9wvQH5aq9cXQzpsjkTMDG2fB+sCVTZAxO1lCw0BZMGx6/0TMHOIvkjyD055jXMXNFwXOHbwgcFgSpsFWtb8mcrYNs+9aHlcI4dtCXtSQSMQMoGGmXLwr5SmF2L41SWQEeYkHrwIBgzI4vhh3eDwlc+CbKBlt/aooADReCrZFicbrOB9N8gJp9zLFS85tne7u17Beff/5XhG5amdQzSQ4fQqWgc/euhDlhji8hhIK8k8/ON2WBlSr/Udrda9Sz2b29r1dvQqjldYQjZ1LfRh0Keb2KYHn/KEiXEcrxfKsgSJU0X0fJRjYYROiTa4W/7OYaGURY2qhIgrR4lnnlKJcj8ZmbtxD6+Pu/Jv/x55tXJIapoCqqOflSZfZbPgn8Ss9VUSabDs4hlGnkWs8q8BqOw1Mz73v1OvLe6hHJ+h2JcOQ/a1tbW7X/yu8n5+poLhhMgtHgnU4nn84E+Wy9lk61ciCjEGgxROPmz5KnLt867Nmd8W++3uKdrbnqXCoLYFLpLA8a5uSDyVw6nSr9JIuYmH33CmZtzPaN01r1cWgm0vu58BTE8lJhrgU8Kn0LWJzBei6VTgEyvobQfF6isGyMa2AZkOHZsxQ3+lFvK/YdpjadzYdWW0E+na1n6kGwFsRMAtSqT2AUB+2237vv5myceMi1Tp/iPW9z+DpdOAgZJxXQag74xOcQoUYakAVXJQ3Y7XueCTdEINNniWWOnrf5u3Y4D2wTP0Gonq3VEfI1hflVJ6GkoMRV7vsD94dcbht3VrTMH4V/RlEPLXNcwzaWU5nC5psjxdAkQgGwgoyIksQ6Oh+0gXmGXC4QxsmzUeFJ0JrnTI/uQnmbYTn3bS1XYUSBaZIkmkS98kGN6NlWhT7rXln2eOx2O8T5ZyODidKaRfkz65rujiBxYO8eavkJCYQZNabHI6s1sI3pBhVG+8rQ0IobgHHi2XDSOzQIctTqViwbnS2INrf70ejf7LaOsmkgJVRt1NLBhX1SBbHbV24TXEChU4ZgSd4d+p//D19aVZsSsyBnnHv5IeFFNzKw7DWe+OrWtAgc5dxuFwWGR85CTS6hiuDOX61kMYZEzsbaXZ4hu91lN+JiOfGA2kWQxo/zuJNzMuNnweBHVDzxv//DwuJHR6h7trtW7Ha7ERgkl4VV3qlC2w1ojhqAbZ8F6xFX48TyXy3s4uhjxf3a7SCJLh1PsE0Q5FlIy5wasmBS1owKt30Wmkuffq94nQT62KxkUaSEHSCG4KE0HWO4/PTlO1XI0NJtYE6iaQJmFWBPTxuFBc18seP1EyFE35t8dOIzpPLAbm+zi2NktEsCq1Q2x7dR0e+FPGXa+wfmd8TiX6UaaP7WTDSGqh0Bis5EE/6B0VIWKVxi1W8wGFgMvAhSQDyfpnD4YDpdItYRmFYUiHl8v0FVInrjt5Gp8fwPwW8lm7A9/kkto5VHEwh9j35c2vhi5xebrsAGqoWlq5k0r5M/ZypdWzhA1QNIZwjGuozfK8f85cXp6wJm4EtGqW9FhsPCQjYwH6eWcaeeBg4Ec/VbixKn2nGO41i5UC3pYTmd2cxB5pO8gMX8J2ghCG/iX+QZ5vr7Mh6jZXRR0hwPLlSz34KtZipbITz+Y5iE+nDrg4QFfHrvzhWJxRBFifsPFnbTVOIoqxrk3zlUzIuYIbAB2/ReKr37BEKw9+XHHI9nRb0/DR1kXwkcJyarMhYCT72RLO8MgtGr1mtpgu1VYF/+r92tYBsVccl1ELx6QGwHjmBUGAkhiRTCr76fukcYbVNYmvXmhFcLqTsi+NuDB4wMogneCRZeTb+c2RlDey0nn2rxOlBEl1IlUhrICIwuzGJtOLA6QqoD0+8FV2SeVZbTDiQA2Wq6LmERIbkg4/0GrLmWSTp3SKlUuuJb0GMCKU0FsxnwYTzf2u80JeiFxPpBHvK3794Hrui0arftOo/LhqoEma866UOyjzAsg7J0SgCJmP0/CrAg0blgrlZPZRcQKhGYezJjQIbzC1UJb0ffA674CEkxIHeEGEkDBlqRRyi1IBdWswghomHZLErT2DE6xcj/VwGWzaZTtWxq4aAxXxFFRMwjvyAZeYYDuz5h6j10pWeuKtmu6/aKWwtqGbnSrACgub1QCdVRxulMJxHK1DbJGxwoq7hjZ6209xJse4Ak0OAd8gs5pwUyIZmbfnX6Ze6nl+gy7K6hoaEJt6Zk4M3EACBLZlPVZIaU2LJJlPWhGf9ALBlUoqV046A6IktgYhi1t/5Jo0aeasgGZIzcWj39BFrhF2t3TwCwoRVdGgIBoA/lMnUqiHPJDBh7QZhCGzWFW7ncAcoLGibV4vgaJFbkXxiR4engrdMuLMYvKvyyuz1DHs/QbbfOl4kiSOMcKRfOpYBfQHfv/oRSFFc6l0QXbZhjDCk0I2VyVM/2ZMwpRIHt1z4/5XSsfFm51Xb3ypBniJSUNGAMFptEFusppFE21WrV1fAplUKl2l/uKjGGjjcyIt4MkO2LkiSJosCCDxNu3kx/eqq4wiTLpwyzTwxN3Hs0MbTiVtInLj8bKPoQuozqaQ1YBiL7tNJUyZVWC4UnC7u7u0+aAtZ3neUDhWe7l+W8Qs3K9NMbtS9PUxa9qKIJ4u0hz8SjgWVVyTgpIEusDGahWURpIo31ZM4ZTNUVs5HO5uo+DkNcn5999nN1VtJBw/kDGhTzrQroH3yRQSSm0PjyNGUxrqZWRBDBJD4a+NWz4gZPxkkyifeIggjC7FwaNWo12qNU+JVKzZV8KIBpjYOVAHsA4kwydQT5QKUiV+sKzy7aNDFlmqV66LtTC4O9iAYJrJ1UnADYvYF7E7eJwWc7lg7i4FknagSBaSHFbvDBUuplhS0Ct8lwAIDjxCYKSAUwkWxhBLgswesJsvS85tBwAe3JwtTjU4IWv6x8rouaeo/n14EBD3gyfRqpeKF6lYcYvaI0LWupOmSOHDupyjHFhuXZSgDNztMMgcTMKXoLft5XeIYzaI+4u/HJ04DWZhgVRM/yxPLowEPPbbfLCIyTaiXEA4o71BymG41JwggOwuMmbht7EEKpmGk0ORKTAc8QLRHwL2hFC8sL1QXyUsyN75x8dyI+b1M1jDLM/3Di+QC1i13lXa6eQ84fKiNbhGHp2ipq0toAybSauAOsUuGEuz8/ERn1OcUvfGsjIx9/qtfvKIKAhYuHdErfCY0itT1Hg6khz+i9CdCy5xNDLrexCooDqQz/wzxVm1RjtSDKTeokGJC4iuqgGbFIChtYrv+cpzxSkfHpQF7IF1Jo7xuVuxz+542TrXbHQlhnEocmHj70eDzE4k+4XQY14/JbWV4xHGD5m5gTBFlULDtaDLAKjqJS9MXCgxd34SFRlGh308mXUAFBlLLbTmZYuAknmk0/Vae51CiRBFSgaI+Wif3opGVUyXZTcxRXsPSzajDUmcRKPI7AiTHSrFa54myFhTsiFgJi8yUtMQar8+DiSwf5ToTC2QInaEO8SLAZgCnoJiBktHfV5NmFrMKvVMcQ0sdt3GVvDM1KUrFd5QCX5WuU8rhwGYIrKow1FKyj7EVDzQ6foKKFJ5U1ciTqMBBwjJC2EJYRQA5JZSC5cNGYaNEyqDe6GNJbG1aebLQCttnJUD1HpquCGT6TrlYEwxtPEFl8ii4SvLNiPDrkosBcGjIs3wnywSzPZzOvjEk/eZIMkX4nGHQSs5800sVp5EOlLGnbZtIlYLUkGhU3dFLSeENmNGCK9VAk8fZtgsvV5hhoyx6wK5XkwQxIXb4bnhYX/TtkhpsMJ1KC6FBuzieVsQ/q0Us1+GV2pElKsZ0LsCe0U2RUjetJYA/IJgjdXnG7Sd3DznXqgvIqKSNmIdfkV0dwNy6hUkCPUREoUPgGqFBpyqKcn0XzDZ6WSiAA4XOlHGQGqz/dHSnkxU7JUTyZrSL+tu2gyBRSVItlNZXB4uyukwdjSJwSvyCbJJEVhUpAlORmpVC882K3tdUq7S18XXriIwN/JNHJEpuTTWWD6VojuQqPkLKs6vrkX04E2KTaM7F3iKiVzgwwzD4pvTvTGVQl9dKSGRi426IIcsgQEWSlfOFOo7G6mszmUnMZOqtTBbOTIk3pdLK0UFp4CQ+NiFpkfO0kDIhjmtFxzG6wg+qSpQct0JFUHSVRDoF5K+UtgEmafNIpYFICkpvFRpbU+Mm4GEK1VBVsY+rrB4W8DFTxoZdNVR7ZkxDGsGa5dbj0ThlLs7vEWDvrjdVP7qyG4Me9gknHbIRhXVAZTOp2qA7g0mSgNpPmU1VUIFtfCHIhn2nNCicnjOVLmhvTxNCwXrCFBBafKtWrD0RUuEg87bx5qkMMdINlxHnkG6kUfKR2l3IG0zwpLYQ6Q+tYXN1Sozlm9t2n1eUpgygaYihIg2lfi2h9BoKNPGIrEPeltahZ98qC3M0w8XJTxKTFdhn5fChJbs50oKAElxr0emufhsRgGd95PBxROcaa1IsR9ktbPB9Mp9Iok3mZx3hSxnlQN341b/JjRaH7EVZpInFFVAzNyqEGH9zah2jS0AQVS+p4HL7yzlkWuaLJEPHGGrtYG9zqH0iDKJ1DjWypWpQwrhQwJ74gfSKT3AkBMgfXNexB0VWKkiiC2IWy2fQsNowmcRDMvGjS+g8nLr5TVN6bA5F22Md2umJg4YkpDDpzuWwDoYNpCTM2tgICiJ+QePagS8k4uckQYXZ1lxNsrIRpsZQ0fXN3DPcD5IPFxQxlNYsvvkn84XU4EkCOnvKLygPlabO3ZRj5wS5Psv9sFS2ECtpgL/kukNHR3H5Xh6gCKmbvTgbotbQsRgJ7/0wvr/TF8LDiO7jt4xZSE5Ebj1+NXJ0Culp8bL2lkGwtD6Mu7SAFmSctCMZrc5lVRLRdXwdliJI5g/NdDSJi7K2coO6NaC51h+mIunoXmGJRLfMcZ0piNBH3Xd22kUiU7pfEWJyanDFhixNT5EUGB8RhYX91i/Res5mDyTyHGeNCOYFMjvIlQxjMYnJ3aESmxGIWuGSIFx90KiPwStqqApYpD+JXR9rFRPzVpW0Oc8b1ArZ/GQ8OiSBIGMo/Il0cwWCp0ABY4HVyu9Uma3bENhwgfq1kTMhYRGcS3SsrbmKCzEzj2PmPcyUtOIHUz37vkdKD0zw7Hjki+oj9Mr1tEJ4ONtt2SBeUxVAUjAf4zE5VEMvFPeK3gvX6y4OCYA6c6K3fJVtykD714kQfpi5+aOi2+28EG2dkGss00VxyAW4hS1/3t4lHA4+UWhHTlFWDfxgwfwRdEjBnIQrKovD137TySQLdJEM2CN0qKokmeBUwhMSYo/rHpFbd4yLCD0QWV/W1AU6iFVdaW1geUBJv4yKY0Mta9YVAnnFB9rA8MHBPmzgVFZfNTPUu7IxG0DjL9FBehTA7ojDN+yPyxlCuhhwxtW6P9/dI3x/8cR2FJCueq5cgwYezhvTLlqkxcdFE9dGy2xSacRUIn0sF8oTbfnto4uHArxOddrAKrKe99/5yTeh1m3XrGn9KusA7KFZGKf7viQGHUgfGlRYt/2Xnkj9XbJZSqJLwM2Vrp0YKwBSOuey0abji7jKPYDlq367+QBjmmrg/8GjCszzhcRt1EV/qBcyBto+GRa6w/aNjIPr9rTDgooc6PCbBOt4nYhjMzNXQJyLuJcvKBQpbZHsHMYS0N0RqAD5l1lSpLajAOqMiIpqrV1clhpgXz3NSi/UMubp8Hr7ao/aR8B3GLrJ9S+AkqvGMUIz+9e/Rr7K8c0exIozKr1Kyinz53lKorRPCqmASyViAlDkP2ZUoKOLsolp2W8XVXjfOH2Qyu6CUwFL3ysTyhAbesMIr1sAc80Lv9QhyvilLMoSw9EWcbTJdWq/z/GeKviKR8itYarx82cMWGulBEPJOFChkt4LB3VeFZtNGvTyNoyfauLTAk2Nf1SH1ItNiLurrViY8Jlw2JmApil50CC4i5JDOomJRKgikKyeVeISCWV4ZPh+Ij++3aAB18OoQo9EhfC0IgUkVgWdoPZAYzGKJenkSBSs+2siwQqO+VVTHh9XCijn64kJWVtG7qM+QWIvxfsjU84XLYN0FESLurRTKpnNfqKlCmbQN+FTyRYHr6SkMt2kffHi6joItsuHUhi+LoUUaiejrJtqyWXB82dasNsqkZbOmqJKxLA/cmNJ7Ff3lOytlWDFPUthik8vwJZSe49WzRTZJLYJP1VDepKQcZ8VAxUeX0IKsbGNBgfJTNcRSluwiewc0QRSSuVS78t2rsEKuYhFSzYTaZWgjLKM74VhahEDyHl9t8FmncrTI67+TigaYDdmESwQSSOHJqHecRICl1ZCFkdDOQFzLw212fbQIeSW+2Jq709YTqmVWaQAnPjZPE8Q6qboCiwQ17m4dpre6SJGlgyidS6fJHFqCtoXScw0kmYw8np33oZ9fJO9WZICnm7sRSa82/VKp6eC7/+0diIzosjr6TWrCgtQUhWwtKXZujN1liQuWZh4V9uuiPQXXbY/HA57dbeI5FuZJjY93pvg6X7tBdgpQMUzW50ULa4gxK0qVZ7utrdpP+525U2J8SFsopPQzd+OQ/PgMdwVibgBVqDQltrKV0w8uamrYLeL4irm2GPe1+aVIuEetv3c7SiCxQHgGRi1b459cn1mq0Wgj10A+S6vKkvvOinIh2drKFtQBFTLcRt6WJRsKOPHOF+Gu5IfBYuUJhGWk6sEm+VJXF8IKlw37TNY+3G4R0Le4dS2TCbIDyG5oS9JaX5oPouDWPutL08F4yP4jt0K97TwHDJACu8G9CsQAYIPk0BxPh5kFElQE58gqfmlbHoaTn+3u/qQ4Dk5u8Z8Ydbc9pm/4CHOZanSx0s5yKL/UbskEaUyqHS5D16pI9rwm63x9f46IYXoui1AZArLulpdxNbQeHHwm2yp3WlupLJ16QwIjolyQjoxGZrV6tfTT1tafZFVu8f5Wy6JubCImbyqZRtvSregX7UpOLD9//uuERwtvDN5JKCCUzKTSiOYowWwd0S2YDmOT0uKzGbke3PphsnL36zmaRTeQIKFSWnEao4u0wgApXck5J7fNKK5svTg0dNAuHuouv6kzGrZ2wZPiek6eeuRpN+/01xCawDKUyigzM6Vvv0XKlK4DXbH0WioRecRXS8HcNxcL83N0WhYVUCpXU5U+Cq4UwoC7u619nXeAWODJMRjGSSZJjIYMgki7rZ5l5TmIohVhNGgZI0+iOqqTOfIcHarUpo9BGnshA18myJXACHwt5GrTgbqyYQAFU8mcV7vDLCvf3Q2WDO6QqeweIQjKy6ZMpZwbksGnKyMovyrP3SO/uExeQ2xS+0Fyr7oqhwol0CxrcXs5LOSL88WmJAgsg5s/z6UzdI5oDmXBBtH9xI5EOPbVk6+3yBY440hppWrufloAm+w29o6QthLV8Xl0wEaXNS0zsIyTybYAnq81iLPWH9jgXURS9/3lWHm2KLOYng8G9hvLSTpC63QmUbBe+3ozESl9DvQFmNrcXaEriGbyh0fn6mdYSOJ1o4YpwO6rz/4KLPN0hx/EDBRRfS5ZBXYVpSn9sZX+GdQ0ZM+kvtMUMAP2WBJFSZaaTQkYXieRRxXVM6nK//sinU0mk40//Oc/kGjKDRh5/limo3sjz+ikwSSqzpnM1XRkccVkPuDjQuqsaPHrXGlGH1aH0aTcWR4jBAqKbAkyGNMApAc+0hYicVgWVVG1ihoZlN1dRfGww7toViemeQxjz8imyD52STMdLh0wYJkaUE54rMwHnRFCpFuK/juTzAY/j+uvW4aYQa3fYWlSNQVMfkQWpEqgUCnQe1LN5pLtOdoHspy/QsaGze0lNWk/AlhopwvXwMx2VzrgVsKpCdUuEiXzuEyyCGpGYkaULLW2gIJbn/1ZJ+Oj5ceoIrGYiGE7nya9ZWXWQSqibpovFkQBIpKRSVPR7jh5q5lhA0ifLHT8M5n0agNTnXTX5zVplF+tSJK0/1U5umM4b3Q09hhNXpXkWVMtj7U1feiyHtRkKFAZgcuQvrIkhmRsVeA+jDjBfEZDot2nagNTp4YUNfNTmB6LcBoDsCTin8nkjB5qkhLGdCgRvbFYtFAPMS+SBrLIYVFukpS8mBclm0C4ScpVXKFwmJe3wsVOmrcARsZNHNNmazz3/QMD9xXBNLsyG1eZR+CEakQD8BXLDUL+P5qalMqRJPT9SsKFxXzIVxBtNNagUyE4HzpOOUi3klmTgg0MPNU0U5eYtoeGhu4vq/mLkswYriZKAZROpr9WG8AWG2n8iyZLYEWYg8QL5LC9kQ5Llqldz/dfssicva+MCaZeyYg0eoZ0wLplsRBKzal9HeaaReXr6fixyq82mv9zOuYyQug4wYbyVnzJ6hg/x1VjhkmpPefVISUdN36YEJAWartKY5Kx2CUfu/bGVqC9WiF0nIDeRgYipi232IanLIDZPd241NjDoGSc3BR+Du6puS37ynTtReUp9veAY6RQd2hljet6j8G38nULYG4TyybMFQJS7pMWeK3ZjUPd8lC+SruqRMSPV2s0rlhGBQkfoWkMO/K0xya5yHb7vTqO6QdgKak1567gg5FbW1qLHM92e0ilhKEFoG8KjcUQf4Xyh7ENc9d/7DmBGd1uv1EHzO4izQwdac91AdsPtjQlx93WI0yzPN01uTcUSsG3A867QLZ/W5Zc2euhSO89jTpgdgMZeKZJYjewQnBPs2Wm3eTxcUZ3TWWCkbOowfQkZjzij5E+8Ihs7s8zzLivfNhWzZ7ADHrWYaaxeZrfSrZ3BF/vCmp+AUls663rwjm1SMkd35owPriMt6xgE2xk4o1EJ7TgeAkdcXRkvA2MNcii3eV23dakccVtDYwT955p0yXd9t6LMKsLP88BUWidCeFjsEyRbnI4N+hboSlLhPKFWbR4KLe6ONbFMlLlXqFVAh2urp0qzGobWPdxL4lZptM5AYadO3dh4oJWWiYdBzUeZMlwbQ+kQvuS/nBk5nE7aI6Hj97xVx7vWFTOhMyt7mfuUNc9LRx0dCxuvnAbGMH1/N7Dcxcu3F6x0+QOwFFScJIfOJOI4qKRL15HghwQeiQoemOvdiZdWLsFuQ24TP2NdgmZ6Tq3LC7CQtu9rAuACx4cvXf/AsHmcnddlr6oW0RZTRZ/D3n1eYWJZWbquqeMrA1P4ivGRcxQ56ypLdiOe8rjj57fn6DgKDoyNeTuefW3Os3oqT4ms7ss0fQG1hkJwdMGERn9/1QS1Ou5gWPLnSfvPX+4rGgd4CMIe11eeIuzcfRKZrMURgP1tNSM8Tw2/zV1i60CbAVQLD9/pHvBrwTr8v37D+9fONfppXfHJ6Hff6qAd7p7svFNONaRGsGY6/kvYf2NchNzf+HC/Xttc+YHXMovgKxXj/KtDnm7qU9y2aOQ9QS2bfTPfpo1sG0lWzmnQJu4r/LtEcBUXnpPz7IuYJfeYtdbTC+LRyLrBax78MyrXLVtjty3z53TsC0/fH4PzOO5C9SejD4Hy9IDGHf9LbYZjYaMucHhetZzKO5fRm1wXGeMF2sjI9guTNBQ5ML9+/eXiRnRKdmhcvBmFN02nspADoXphatXMMQJXeO4CTXP67xVh0wPkVjHcyu9OPZWp9d5i12ViUPEsQcuUIYumQn/s3sqw+VeuWCGRum222X9AW95qGcni9ZBs2ZaT4Z1tzpiKjC9YLstoU3o/Vj3rum3PK30N6u1WuLqoWLmM83LanDN6kspdhJ7TuhB0eiq9wdw0uO3AhabMpfJWCuf1gOXmWHklFz1yS7Wk8B6hZLLbo4Yuy8sveXfRrrVY0LjeLiAYSYdj11Xr8haCbWbfpnI1X1hRnrLXR0J845JlXSf2hOXBcMGwh3vaAbQk0zAxt/2WL7o9V7I2ra/d7UCB8zbgDqF2DcAZroyM/XWGxRvbPdyUWTK/fCpbqu9dt5rnTt1XFzmT8EX33qDs9d6EOoYZCWIECuOvDEwi89nfW+/8dLx2+9FZrlt3N/ZHnZkYE3JSoU5cfEdHGfkePVmTSmV8EVr/f6u85KjszxCFtfm3tp2UPJe/h3I8FSPc1Ljhsz8dwmijbnybnbae82jJ0fiGu8VGhid/lElB5elzcU/vqODtRJvigznF3uluA6kLzlwRyCzVO93eGquA42/Sa8OT/XeLu5fNPQk3Ychc1mbLTzy7k6NGX3ac3rNfEPZKz35NUDaY/ox3sMKYNZyaLMJh/4ZmzelWKjnri8DsVi63Kvpptwjn+HlPQ1Iz9bZuz4N2LFzyXY0NA430RFHpMa6Wuu9kPX6COZf7/pMvsStqSP6vwyW5o8+9OSmYfTaUhrNm547n/HPEziSL3xjZLtHI5F8JCdNPy4ffTsdxnE81pQGHcIuskX2RI5gTXyKArKIDaeKUlAMFuTLN47RxwEKXzEKI2uz67nmOiRjAPdUCVQAAAOVSURBVIad1NFF/tgNhEbGt0WWzjjRyTVOkMZn0cyxrXCke4KF2hC1e2S511kjzuY7IVwUW6I8c4M0EwNXLl29ODs9/+PjGzNv9Od+oxazOdoxq4f6yx573N4leR0J0m5LkD/J539jOxU/9tSRgfD42fhjOodQ3KJQdDQu8+Ty2aPooXsMLImR0Fn4izNHUWz6DVNYRuz1N73OGIXR8aI0DZfgOyN/Oe1ISjweP7Y4ssCvm2fpj/gdSqNRY2gt9JzM5rCMZj4YXEDemSnc2cDJiuZdqpSwMHJCB++dHIV/u64dvCQxgmx59pswddSI1Fmk0UjouogZAUgUxHwXzzhsky6h6Nl3X1bkL9+aHxexJAnwVenUV+i24LwPxT9MWJQccYSmrtokUagUZSWwZjAnjM+jG7EPTwgN5A/Hny5OTl++Frh6URZFcfv61VdP428UWp9d8jtikfjMzs7Txz/ORMIf1J9R71Of+tSnPvWpT33qU5/61Kc+9alPfXpf5Pg3pQHT8S7/JjQw+G9KfWAfGh0KbHjY8Jv6/WGQCuw1fK8Pdn6mdH5jY2y9/dvg2vDg+sbrwQ+EFGDDS0vD56Pnx84PfjSGooPDY2MfDY+hGNBmGY0hNDiM0HoCodeba+95vccmlWNfRca+2tyMbCL43oy8jkQ218prjjWElrwbEUdifc3hWAuvOdbX3hvHrJVgmHwNDyv/U935SH1GBTYWGVxa2jy/ubSEUHQ4Mog2NzfG1hKOzaUIcGojFn6N1r2O4VNVseGN10uD62Pr66/Prw8PLm2urQ+vD3+1BjIzTH4C3RlbWopuRDc3IoObG/BTZD0aQZsbw3pgwxsb8ARgWxseiw6Wx87Tn9CwYzOyFkOvw4mxsXVvYv10bcf65ma0DHc4srm0GdmAfzY316JL5bWx6Ab8WC5HXy+haHk9shlbi22ORTaWNpc2NrqADQ7HNgcjw+vrETAQG0sbg5GNteHyUjQB4ufYDG9Gwptr8PPYqQIbK28QCGuALboB/25GARx8DZbXIktReHRzjaCJRCJr0XJkbY38uFbe/MgIbAnYG90k32NLaCkKAjAMt+qjMQAY2RgbA5FcQqdtOr4a/Ght7PX6+vDa8Prg2vnXg6/ht8F1+Jk8sg72+/XGOqzp9UewXPgJxFZTsY4fIwz8CP45T/XwPH1o7CP6+BhRyzFFPc8aDVv8ROl/Z+TxIVMf2IdG/wNKsYaLLcsxgwAAAABJRU5ErkJggg=="
        ]
    },
    chard: {
        soilNeed : 5,
        waterNeed: 4,
        pollinatorScore: 6,
        difficulty: 4,
        pollinatorNeed: 5,
        growthSpeed: 2,
        urls: [
            "https://docs.google.com/drawings/d/e/2PACX-1vRVGjFT2cJ8x89pgLptYvStIjFRhdCNlFvl8F6NQzrMAyf7AY1hI3XVGzAWVadX8qm5yfw5LZuFLa_C/pub?w=697&h=678",            
            "https://docs.google.com/drawings/d/e/2PACX-1vT5ehnOGLiAeU_eB3sygyCUy3RaX6RzkxzyZhm6Aznj1j77no87FekRjInmo5GPFBSub19Fj-8Ap9zU/pub?w=960&h=603",
            "https://docs.google.com/drawings/d/e/2PACX-1vThFSXJGzErpAU65tRTOC8lOg-BJt019kWvWr4of6DSODIiDPOMz3WCyLYyj4YM1rFWGaU48GGWZHZz/pub?w=960&h=720",
            "https://docs.google.com/drawings/d/e/2PACX-1vThFSXJGzErpAU65tRTOC8lOg-BJt019kWvWr4of6DSODIiDPOMz3WCyLYyj4YM1rFWGaU48GGWZHZz/pub?w=960&h=720",
            "https://docs.google.com/drawings/d/e/2PACX-1vQ0gt6eV0MT0evZQbfCwes3kjjK95e1KShGk4CzOSO8gTP1KFTpJMAj8JxkzUPcXHaRWm16RHtU6HzT/pub?w=695&h=530",
            "data:image/jpeg;base64,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"
        ]
    }

}


class Plant{
    constructor(name, space){
        this.name = name;
        this.space = space
        this.growthStage = 0
        this.water = plantDict[this.name].waterNeed;
        this.soil = 7
        this.hydrated = 1
        this.fed = 1
        this.dyingCount = 0
        this.harvestable = 0

        this.urls = plantDict[this.name].urls
        this.soilNeed = plantDict[this.name].soilNeed
        this.waterNeed = plantDict[this.name].waterNeed
        this.pollinatorScore = plantDict[this.name].pollinatorScore
        this.difficulty = plantDict[this.name].difficulty
        this.growthSpeed = plantDict[this.name].growthSpeed
        setInterval(() => this.grow(), this.growthSpeed*5000)
        setInterval(()=> this.loseWater(), 5000)
    }

    isThriving(){
        // if soil quality and water level and nutrients and good, then plant thriving. If not then wilting or dead
        if(plantDict[this.name].soilNeed <= this.soil){
            this.fed = 1
        }else{
            this.fed = 0
        }
        if (plantDict[this.name].waterNeed <= this.water){
            this.hydrated = 1
        }else{
            this.hydrated = 0

        }
        
    }

    //works
    

    //grow = setInterval(grow, this.growthSpeed*30000)
    loseWater(){
        this.water -=1
    }



    display (){
        console.log(this)
        let bed = document.getElementById(this.space)
        let urlProp = 'url(' + this.urls[this.growthStage] + ')'
        console.log(this.growthStage, this.urls)
        bed.style.backgroundImage = urlProp
    }

    grow(){
        if (this.growthStage <= 3){
            this.growthStage += 1;
            this.soil -= 3
            console.log(this)
            console.log(this.growthStage)
            this.display()
        }else {
            this.growthStage = 4
            this.display
        }
        
         
    }

    harvest(pollinatorCount){
        if (this.growthStage == 3 && this.pollinatorNeed <= pollinatorCount){
            this.harvestable = 1
            this.growthStage = 4
            //display image
            this.display(this.urls[4])
            return this.difficulty;
            console.log('harevsted')
            
        }
        return 0
    }

    die(){
        delete this
    }

}