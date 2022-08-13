export const useGraph = ( query ) => {
    
        const data = ref(null)
        const error = ref(null)
     
        const graphql = useStrapiGraphQL();
      
        graphql(query)
          .then((response) => {
            data.value = response.data
            
          })
         
          .catch(error => {
            data.value = error
          })

        return {
            data,
            error
        }

    
}